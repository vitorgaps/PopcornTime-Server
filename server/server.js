require("dotenv-safe").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/", require("./route/reviewsRoute"));
app.use("/", require("./route/seriesListRoute"));
app.use("/", require("./route/usersRoute"));
app.use("/", require("./route/authenticationRoute"));
app.use("/", require("./route/seriesRoute"));

app.listen(3333);
