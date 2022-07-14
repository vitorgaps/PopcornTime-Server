require("dotenv-safe").config();
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use("/", require("./route/reviewsRoute"));
app.use("/", require("./route/seriesListRoute"));
app.use("/", require("./route/usersRoute"));
app.use("/", require("./route/authenticationRoute"));

app.listen(3000);
