const mongoose = require("mongoose");
const newSchema = mongoose.Schema({
  id: String,
  name: String,
  desc: String,
  date: String,
  profilePath: String,
  photoPath: String,
  videoPath: String,
});
module.exports = Posts = mongoose.model("post", newSchema);
