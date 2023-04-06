const router = require("express").Router();
const song = require("../models/track");

router.get("/", async (req, res) => {
  if(req.query.search) {
    const cursor = await song.find({
      $or:[ {
              track_title: { $regex: req.query.search, $options: "xi" }
            }, { 
              album_title: { $regex: req.query.search, $options: "xi" }
            }, {
              artist_name: { $regex: req.query.search, $options: "xi" }
            }
          ] }).limit(req.query.max ? req.query.max : 0)
    if (cursor) {
      return res.json({ success: true, data: cursor});
    }
    return res.status(400).json({ success: false, msg: "No Data Found" });
  } else {
    const options = {
      sort: { createdAt: 1 },
    };

    const cursor = await song.find(options);
    if (cursor) {
      res.status(200).send({ success: true, data: cursor });
    } else {
      res.status(200).send({ success: true, msg: "No Data Found" });
    }
  }
});

router.get("/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const cursor = await song.findOne(filter);

  if (cursor) {
    return res.status(200).send({ success: true, data: cursor });
  } else {
    return res.status(400).send({ success: false, msg: "No Data Found" });
  }
});

router.post("/", async (req, res) => {
  const newSong = song({
    track_id: req.body.track_id,
    album_id: req.body.album_id,
    album_title: req.body.album_title,
    artist_id: req.body.artist_id,
    artist_name: req.body.artist_name,
    tags: req.body.tags,
    track_duration: req.body.track_duration,
    track_genres: req.body.track_genres,
    track_number: req.body.track_number,
    track_title: req.body.track_title,
    track_url: req.body.track_url,
    track_language_code: req.body.track_language_code,
  });
  try {
    const savedSong = await newSong.save();
    return res.status(200).send({ success: true, song: savedSong });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.put("/:updateId", async (req, res) => {
  const filter = { _id: req.params.updateId };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await song.findOneAndUpdate(
      filter,
      {
        track_id: req.body.track_id,
        album_id: req.body.album_id,
        album_title: req.body.album_title,
        artist_id: req.body.artist_id,
        artist_name: req.body.artist_name,
        tags: req.body.tags,
        track_duration: req.body.track_duration,
        track_genres: req.body.track_genres,
        track_number: req.body.track_number,
        track_title: req.body.track_title,
        track_url: req.body.track_url,
        track_language_code: req.body.track_language_code,
      },
      options
    );
    return res.status(200).send({ success: true, artist: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.delete("/:deleteId", async (req, res) => {
  const filter = { _id: req.params.deleteId };

  const result = await song.findOneAndDelete(filter);
  if (result) {
    return res
      .status(200)
      .send({ success: true, msg: "Data Delete Successfuly" });
  } else {
    return res.status(400).send({ success: false, msg: "Track not found" });
  }
});

module.exports = router;
