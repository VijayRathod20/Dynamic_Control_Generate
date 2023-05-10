const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

//requires
const router = require("./routes/route");
const ejs = require("ejs");

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.set("view engine", "ejs");



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
