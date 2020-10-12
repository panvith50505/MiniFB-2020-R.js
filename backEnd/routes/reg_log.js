const Router = require("express").Router();
const User = require("../modules/registerCandidates");
const bcrypt = require("bcrypt");

Router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(401).send({ msg: "Fill all the labels" });
    if (password.length < 5)
      return res
        .status(401)
        .send({ msg: "password must contain atleast five characters" });
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(401).send({ msg: "user already exists" });
    const pass = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: pass,
    });
    const rel = user.save();
    if (!rel) res.status(401).send({ msg: "internal server error" });
    return res.send({ rel: "user registered successfully...." });
  } catch (err) {
    console.log(err);
  }
});

Router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(401).send({ msg: "Fill all the labels" });
    const findUser = await User.findOne({ email: email });
    if (!findUser)
      res
        .status(401)
        .send({ msg: "User does not exists please register before login..." });
    const comparePass = await bcrypt.compare(password, findUser.password);
    if (!comparePass) return res.status(401).send({ msg: "Invalid Password" });
    return res.send({
      id: findUser._id,
      name: findUser.name,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = Router;
