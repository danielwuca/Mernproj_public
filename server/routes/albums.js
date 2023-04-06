const album = require("../models/album");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const options = {
    sort: {
      createdAt: 1,
    },
  };

  const data = await album.find(options);
  if (data) {
    return res.status(200).send({ success: true, album: data });
  } else {
    return res.status(400).send({ success: false, msg: "Albums not found" });
  }
});

router.post("/", async (req, res) => {
  const newAlbum = album({
    album_id: req.body.album_id,
    album_favorites: req.body.album_favorites,
    album_listens: req.body.album_listens,
    album_title: req.body.album_title,
    album_tracks: req.body.album_tracks,
    album_type: req.body.album_type,
  });
  try {
    const savedAlbum = await newAlbum.save();
    return res.status(200).send({ success: true, album: savedAlbum });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

router.get("/:getOne", async (req, res) => {
  const filter = { _id: req.params.getOne };

  const cursor = await album.findOne(filter);
  console.log(cursor);
  if (cursor) {
    return res.status(200).send({ success: true, data: cursor });
  } else {
    return res.status(400).send({ success: false, msg: "No Data Found" });
  }
});

router.put("/:updateId", async (req, res) => {
  const filter = { _id: req.params.updateId };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await album.findOneAndUpdate(
      filter,
      {
        album_id: req.body.album_id,
        album_favorites: req.body.album_favorites,
        album_listens: req.body.album_listens,
        album_title: req.body.album_title,
        album_tracks: req.body.album_tracks,
        album_type: req.body.album_type,
      },
      options
    );
    return res.status(200).send({ success: true, album: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

router.delete("/:deleteId", async (req, res) => {
  const filter = { _id: req.params.deleteId };

  const result = await album.findOneAndDelete(filter);
  if (result) {
    return res
      .status(200)
      .send({ success: true, msg: "Data Delete Successfuly" });
  } else {
    return res.status(400).send({ success: false, msg: "Album not found" });
  }
});

module.exports = router;
