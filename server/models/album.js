const mongoose = require("mongoose");

const albumSchema = mongoose.Schema(
  {
    album_id: {
      type: String,
      required: true,
    },
    album_favorites: {
      type: String,
      require: true,
    },
    album_listens: {
      type: String,
      require: true,
    },
    album_title: {
      type: String,
      require: true,
    },
    album_tracks: {
      type: String,
      require: true,
    },
    album_type: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("album", albumSchema);
