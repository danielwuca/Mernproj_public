const router = require("express").Router();

// artist schema model
const artist = require("../models/artist");

router.get("/", async (req, res) => {
  const options = {
    sort: {
      createdAt: 1,
    },
  };

  const data = await artist.find(options);
  if (data) {
    return res.status(200).send({ success: true, artist: data });
  } else {
    return res.status(400).send({ success: false, msg: "Artist not found" });
  }
});

router.post("/", async (req, res) => {
  const newArtist = artist({
    artist_id: req.body.artist_id,
    artist_comments: req.body.artist_comments,
    artist_favourites: req.body.artist_favourites,
    artist_name: req.body.artist_name,
    tags: req.body.tags,
    artist_website: req.body.artist_website,
  });
  try {
    const savedArtist = await newArtist.save();
    return res.status(200).send({ success: true, artist: savedArtist });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.get("/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const data = await artist.findOne(filter);

  if (data) {
    return res.status(200).send({ success: true, artist: data });
  } else {
    return res.status(400).send({ success: false, msg: "Artist not found" });
  }
});

router.put("/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await artist.findOneAndUpdate(
      filter,
      {
        artist_id: req.body.artist_id,
        artist_comments: req.body.artist_comments,
        artist_favourites: req.body.artist_favourites,
        artist_name: req.body.artist_name,
        tags: req.body.tags,
        artist_website: req.body.artist_website,
      },
      options
    );
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.delete("/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const result = await artist.findOneAndDelete(filter);
  if (result) {
    return res
      .status(200)
      .send({ success: true, msg: "Data Delete Successfuly" });
  } else {
    return res.status(400).send({ success: false, msg: "Artist not found" });
  }
});

module.exports = router;
