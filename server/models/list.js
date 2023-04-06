const mongoose = require("mongoose");

const listSchema = mongoose.Schema(
  {
    list_name: {
      type: String,
      require: true,
    },
    creater_name: {
      type: String,
      require: true,
    },
    list_tracks: {
      type: [
        {
          track_id: String,
          artist_name: String,
          track_title: String,
          album_title: String,
          track_duration: String,
        },
      ],
      require: true,
    },
    reviews: {
      type: [
        {
          owner_id: String,
          content: String,
          rate: Number,
          owner: String,
        }
      ]
    },
    total_playtime: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: false,
    },
    average_rate: {
      type: Number,
      default: 0
    },
    number_of_rates: {
      type: Number,
      default: 0
    },
    number_of_tracks: {
      type: Number,
      require: true,
    },
    public: {
      type: Boolean,
      default: false
    },
    user_id: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("list", listSchema);
