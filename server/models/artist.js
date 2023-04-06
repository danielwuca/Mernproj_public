const mongoose = require("mongoose");

const artistSchema = mongoose.Schema(
  {
    artist_id: {
      type: String,
      require: true,
    },
    artist_comments: {
      type: String,
      require: true,
    },
    artist_favorites: {
      type: String,
      require: true,
    },
    artist_name: {
      type: String,
      require: true,
    },
    tags: {
      type: String,
      require: true,
    },
    artist_website: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("artist", artistSchema);
