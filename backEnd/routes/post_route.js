const Router = require("express").Router();
const Posts = require("../modules/postsModule");
const upload = require("multer")();
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

Router.post("/post", upload.single("pic"), async (req, res) => {
  try {
    const {
      file,
      body: { id, name, desc, date, profilePath },
    } = req;
    if (!id || !name)
      return res
        .status(401)
        .send({ msg: "please login before uploading a post" });
    if (file) {
      if (file.detectedFileExtension === ".jpg") {
        const fileName = Date.now() + "-" + file.originalName;
        await pipeline(
          file.stream,
          fs.createWriteStream(
            `${__dirname}/../../public/uploadedposts/${fileName}`
          )
        );
        const newPost = await new Posts({
          id,
          name,
          desc,
          photoPath: `/uploadedposts/${fileName}`,
          date,
          profilePath,
        });
        const rel = await newPost.save();
        if (!rel) return res.status(401).send({ msg: "something wentwrong" });
        return res.send({ newPost });
      } else {
        const fileName = Date.now() + "-" + file.originalName;
        await pipeline(
          file.stream,
          fs.createWriteStream(
            `${__dirname}/../../public/uploadedposts/${fileName}`
          )
        );
        const newPost = await new Posts({
          id,
          name,
          desc,
          videoPath: `/uploadedposts/${fileName}`,
          date,
          profilePath,
        });
        const rel = await newPost.save();
        if (!rel) return res.status(401).send({ msg: "something wentwrong" });
        return res.send({ newPost });
      }
    } else {
      const newPost = await new Posts({
        id,
        name,
        desc,
        date,
        profilePath,
      });
      const rel = await newPost.save();
      if (!rel) return res.status(401).send({ msg: "something wentwrong" });
      return res.send({ newPost });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = Router;



