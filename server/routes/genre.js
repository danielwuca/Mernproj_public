const router = require("express").Router();
const genre = require("../models/genre");

router.get("/", async (req, res) => {
  const options = {
    sort: {
      createdAt: 1,
    },
  };

  const data = await genre.find(options);
  if (data) {
    return res.status(200).send({ success: true, genre: data });
  } else {
    return res.status(400).send({ success: false, msg: "Genre not found" });
  }
});

router.post("/", async (req, res) => {
  const newGenre = genre({
    genre_id: req.body.genre_id,
    parent: req.body.parent,
    title: req.body.title,
  });
  try {
    const savedGenre = await newGenre.save();
    return res.status(200).send({ success: true, genre: savedGenre });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.get("/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const data = await genre.findOne(filter);

  if (data) {
    return res.status(200).send({ success: true, genre: data });
  } else {
    return res.status(400).send({ success: false, msg: "Genre not found" });
  }
});

router.put("/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await genre.findOneAndUpdate(
      filter,
      {
        genre_id: req.body.genre_id,
        parent: req.body.parent,
        title: req.body.title,
      },
      options
    );
    return res.status(200).send({ success: true, genre: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.delete("/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const result = await genre.findOneAndDelete(filter);
  if (result) {
    return res
      .status(200)
      .send({ success: true, msg: "Data Delete Successfuly" });
  } else {
    return res.status(400).send({ success: false, msg: "Genre not found" });
  }
});

module.exports = router;
