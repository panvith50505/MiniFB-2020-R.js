const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoose = require("./database/mongoose");

app.use("/reg", require("./database/routes/reg_log"));
app.use("/fetch", require("./database/routes/fetch_rout"));
app.use("/user", require("./database/routes/update_route"));
app.use("/new", require("./database/routes/post_route"));

app.listen(1000, () => console.log("server is running on port:1000"));
