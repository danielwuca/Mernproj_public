const mongoose = require("mongoose");

const genreSchema = mongoose.Schema(
  {
    genre_id: {
      type: String,
      require: true,
    },
    parent: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("genre", genreSchema);
