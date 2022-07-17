const MovieDB = require("moviedb")("d484bfe2ecbed777477de8df9626995c");
const express = require("express");
const router = express.Router();
const seriesService = require("../service/seriesService");

router.post("/series", async function (req, res, next) {
  try {
    await seriesService.updateSeries();
    return res.end();
  } catch (e) {
    next(e);
  }
});

router.get("/series", async function (req, res, next) {
  try {
    var series = await seriesService.getSeries();
    return res.json(series);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
