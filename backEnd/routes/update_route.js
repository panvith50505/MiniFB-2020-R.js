const Router = require("express").Router();
const User = require("../modules/registerCandidates");
const upload = require("multer")();
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

Router.post("/updateProfilePic", upload.single("photo"), async (req, res) => {
  try {
    const {
      file,
      body: { name },
    } = req;
    if (!file)
      return res
        .status(401)
        .send({ msg: "please select a photo before pressing save button" });
    if (file.detectedFileExtension === ".jpg") {
      const fileName = Date.now() + "-" + file.originalName;
      const rel = await User.findOneAndUpdate(
        { name: name },
        { $set: { profilePath: `/uploadedImages/${fileName}` } }
      );
      if (!rel)
        return res.status(401).send({
          msg:
            "profile pic was not set.Please login before updating profile pic",
        });
      await pipeline(
        file.stream,
        fs.createWriteStream(
          `${__dirname}/../../public/uploadedImages/${fileName}`
        )
      );
      return res.send({ rel: "profile pic updated" });
    } else {
      return res
        .status(401)
        .send({ msg: "please select only .JPG extension file only" });
    }
  } catch (err) {
    console.log(err);
  }
});

Router.patch("/updateProfile", async (req, res) => {
  try {
    const { id, name, email } = req.body;
    if (!name || !email)
      return res.status(401).send({ msg: "fill all the labels" });
    const updates = req.body;
    const op = { new: true };
    const rel = await User.findByIdAndUpdate(id, updates, op);
    if (!rel) return res.status(401).send({ msg: "Something went wrong" });
    return res.send({ rel: "data updated successfully" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = Router;
