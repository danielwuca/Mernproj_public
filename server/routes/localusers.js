const router = require("express").Router();
const { User, validate } = require("../models/localusers");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    let localhost;
    if (req.body._location) {
      localhost = req.body._location.origin + "/";
      delete req.body._location;
    } else {
      localhost = process.env.BASE_URL;
    }
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({
      ...req.body,
      password: hashPassword,
      name: req.body.firstName + " " + req.body.lastName,
    }).save();

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${localhost}users/${user.id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  const options = {
    sort: { createdAt: 1 },
  };
  const cursor = await User.find(options);
  if (cursor) {
    res.status(200).send({ success: true, users: cursor });
  } else {
    res.status(400).send({ success: false, msg: "No Users" });
  }
});

router.get("/:id/verify/:token/", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await User.updateOne({ _id: user._id }, { verified: true });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.put("/role/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };
  const role = req.body.data.role;
  try {
    const result = await User.findOneAndUpdate(filter, { role: role });
    res.status(200).send({ user: result });
  } catch (error) {
    console.log("error");
    res.status(400).send({ success: false, msg: error });
  }
});

router.put("/activate/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };
  const activated = req.body.data.activated;
  try {
    const result = await User.findOneAndUpdate(filter, {
      activated: activated,
    });
    res.status(200).send({ user: result });
  } catch (error) {
    console.log("error");
    res.status(400).send({ success: false, msg: error });
  }
});

module.exports = router;
