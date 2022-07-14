const express = require("express");
const router = express.Router();
const seriesListService = require("../service/seriesListService");

router.get("/series/list", async function (req, res, next) {
  try {
    var seriesList = await seriesListService.getList();
    return res.json(seriesList);
  } catch (e) {
    next(e);
  }
});

router.get("/series/list/:id", async function (req, res, next) {
  try {
    var seriesListItem = await seriesListService.getListItem(req.params.id);
    return res.json(seriesListItem);
  } catch (e) {
    next(e);
  }
});

router.post("/series/list/user/:id", async function (req, res, next) {
  const listItem = req.body;
  try {
    const insertedItem = await seriesListService.insertOnList(
      listItem,
      req.params.id
    );
    res.status(201).json(insertedItem);
  } catch (e) {
    next(e);
  }
});

router.put("/series/list/:id", async function (req, res, next) {
  const listItem = req.body;
  try {
    await seriesListService.updateItemFromList(listItem, req.params.id);
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
});

router.delete("/series/list/:id", async function (req, res, next) {
  try {
    await seriesListService.deleteFromList(req.params.id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
