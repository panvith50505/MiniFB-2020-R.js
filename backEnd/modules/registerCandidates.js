const mongoose = require("../mongoose");

const newSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profilePath: String,
});
module.exports = User = mongoose.model("regCandidate", newSchema);
