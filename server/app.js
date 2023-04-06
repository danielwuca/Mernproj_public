const express = require("express");
const app = express();

require("dotenv/config");

const cors = require("cors");
const { default: mongoose } = require("mongoose");

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("Hai there....");
});

// local auth+user part DW
const localuserRoutes = require("./routes/localusers");
app.use("/api/localusers", localuserRoutes);
const authRoutes = require("./routes/localauth");
app.use("/api/localauth", authRoutes);

// Reset password
const passwordResetRoutes = require("./routes/passwordReset");
app.use("/api/password-reset", passwordResetRoutes);

// user authenticaion routes
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// Artist Routes
const artistsRoutes = require("./routes/artist");
app.use("/api/artists/", artistsRoutes);

// Album Routes
const albumRoutes = require("./routes/albums");
app.use("/api/albums/", albumRoutes);

// Track Routes
const trackRoutes = require("./routes/tracks");
app.use("/api/tracks/", trackRoutes);

// Genre Routes
const genreRoutes = require("./routes/genre");
app.use("/api/genres/", genreRoutes);

// Playlist Routes
const listRoutes = require("./routes/list");
app.use("/api/lists/", listRoutes);

// copyright complaint Routes
const copyright_complaintRoutes = require("./routes/copyright_complaint");
app.use("/api/copyright_complaint/", copyright_complaintRoutes);

mongoose.connect(process.env.DB_STRING || 8080, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => console.log("Connected to DB"))
  .on("error", (error) => console.log("Error in connecting to DB", error));

let port = process.env.PORT || 8080;
app.listen(port, () => console.log("listening on port " + port));
