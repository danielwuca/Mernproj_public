const router = require("express").Router();
const list = require("../models/list");
const user = require("../models/user");
const track = require("../models/track");

const newList = async (req, res) => {
  const newList = new list({
    list_name: list_name,
    list_trackIds: [],
    total_playtime: "00:00",
    artist_name: "",
    track_title: "",
    album_title: "",
    track_duration: "",
    description: "",
    average_rate: 0,
    number_of_rates: 0,
    public: false,
    user_id: "",
  });
  try {
    const savedList = await newList.save();
    return res.status(200).send({ success: true, list: savedList });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
};

router.post("/:list_name", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  list_name = req.params.list_name;

  const duplicate = await list.find({ list_name: list_name });
  if (duplicate.length > 0) {
    res.status(404).send(duplicate);
    return;
  }

  const mylist = new list({
    list_name: list_name,
    list_trackIds: [],
    total_playtime: "00:00",
    artist_name: "",
    track_title: "",
    album_title: "",
    track_duration: "",
    description: "",
    average_rate: 0,
    number_of_rates: 0,
    public: false,
    user_id: "",
  });
  try {
    const newMylist = await mylist.save();
    res.status(200).json(newMylist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    let ObjectId = require("mongodb").ObjectId;
    const id = new ObjectId(req.body._id);
    delete req.body._id;
    const result = await list.findByIdAndUpdate(
      { _id: id },
      { $set: req.body }
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

function timeToMins(time) {
  var b = time.split(":");
  return b[0] * 60 + b[1];
}

function timeFromMins(mins) {
  function z(n) {
    return (n < 10 ? "0" : "") + n;
  }
  var h = ((mins / 60) | 0) % 24;
  var m = mins % 60;
  return z(h) + ":" + z(m);
}

function addTimes(t0, t1) {
  return timeFromMins(timeToMins(t0) + timeToMins(t1));
}

router.get("/public", async (req, res) => {
  const options = {
    updatedAt: -1,
  };
  const filter = {
    public: "true",
  };

  const cursor = await list.find(filter).sort(options).limit(10);
  if (cursor) {
    res.status(200).send({ success: true, data: cursor });
  } else {
    res.status(400).send({ success: false, msg: "No lists found" });
  }
});

router.get("/", async (req, res) => {
  const options = {
    updatedAt: -1,
  };
  const filter = {};
  if (req.query.id) {
    filter.user_id = req.query.id;
  }

  const cursor = await list.find(filter).sort(options).limit(20);
  if (cursor) {
    res.status(200).send({ success: true, data: cursor });
  } else {
    res.status(400).send({ success: false, msg: "No lists found" });
  }
});

router.delete("/:deleteId", async (req, res) => {
  const filter = { _id: req.params.deleteId };
  const resule = await list.deleteOne(filter);
  if (resule) {
    res.status(200).send({ success: true, msg: "Data Deleted" });
  } else {
    res.status(400).send({ success: false, msg: "No lists found" });
  }
});

router.post("/", async (req, res) => {
  data = { ...req.body };
  data.number_of_tracks = data.ids.length;
  let total_playtime = new Date("2022-12-1").getTime();
  data.list_tracks = [];
  const ts = await track.find({ track_id: { $in: data.ids.map(String) } });
  data.list_tracks = ts;
  for (let i = 0; i < data.ids.length; i++) {
    let dur = ts[i].track_duration.split(":");
    total_playtime += parseInt(dur[0]) * 60 * 1000 + parseInt(dur[1]) * 1000;
  }
  let total = new Date(total_playtime);
  data.total_playtime =
    total.getMinutes().toString().padStart(2, "0") +
    ":" +
    total.getSeconds().toString().padStart(2, "0");
  const newList = list(data);
  try {
    const savedList = await newList.save();
    res.status(200).send({ data: savedList });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

module.exports = router;
