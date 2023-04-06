const mongoose = require("mongoose");

const trackSchema = mongoose.Schema(
  {
    track_id: {
      type: String,
      require: true,
    },
    album_id: {
      type: String,
      require: true,
    },
    album_title: {
      type: String,
      require: true,
      text: true,
    },
    artist_id: {
      type: String,
      require: true,
    },
    artist_name: {
      type: String,
      require: true,
      text: true,
    },
    tags: {
      type: String,
      require: true,
    },
    track_duration: {
      type: String,
      require: true,
    },
    track_genres: {
      type: String,
      require: true,
    },
    track_number: {
      type: String,
      require: true,
    },
    track_title: {
      type: String,
      require: true,
      text: true,
    },
    track_url: {
      type: String,
      require: true,
    },
    track_language_code: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("track", trackSchema);
