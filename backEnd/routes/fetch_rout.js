const Router = require("express").Router();
const User = require("../modules/registerCandidates");
const Posts = require("../modules/postsModule");

Router.post("/userData", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(401).send({ msg: "Pls login again..." });
    const findUser = await User.findOne({ _id: id });
    if (!findUser)
      return res.status(401).send({ msg: "user details not foound" });
    const { _id, name, email, profilePath } = findUser;
    res.send({
      id: _id,
      name,
      email,
      profilePath,
    });
  } catch (err) {
    console.log(err);
  }
});

Router.get("/posts", async (req, res) => {
  try {
    const rel = await Posts.find({}).sort({ _id: -1 });
    if (!rel) return res.status(401).send({ msg: "something went wrong..." });
    return res.send(rel);
  } catch (err) {
    console.log(err);
  }
});

Router.post("/gallary", async (req, res) => {
  try {
    const { id } = req.body;
    const rel = await Posts.find({ id: id });
    if (!rel)
      return res.status(401).send({ msg: "unable to fetch your gallary" });
    return res.send(rel);
  } catch (err) {
    console.log(err);
  }
});

module.exports = Router;
