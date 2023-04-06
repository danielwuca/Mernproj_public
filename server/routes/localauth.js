const router = require("express").Router();
const { User } = require("../models/localusers");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const account_disable_message = "Your account is disabled, please contact administrator.";

router.get("/", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid Token" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = jwt.decode(token);
    if (!decodeValue) {
      return res.status(505).json({ message: "UnAuthorized User" });
    } else {
      const userExists = await User.findOne({ user_id: decodeValue._id });
      if (!userExists) {
        res.status(404).json({message: "can't find user"})
      } else if (!userExists.activated) {
        res.status(406).json({message: account_disable_message})
      } else {
        res.json({data: userExists, message: "login successed"})
      }
    }
  } catch (error) {
    return res.status(505).json({ message: error });
  }
});


router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });
      
    if (!user.activated) {
      return res.status(406).json({message: account_disable_message})
    }

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }

      return res
        .status(400)
        .send({ message: "An Email sent to your account please verify" });
    }

    const token = user.generateAuthToken();
    
    res.status(200).send({ data: token, user: user, message: "logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
