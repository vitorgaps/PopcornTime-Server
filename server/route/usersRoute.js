const express = require("express");
const router = express.Router();
const usersService = require("../service/usersService");

router.post("/users", async function (req, res, next) {
  var userCreationData = req.body;
  try {
    var user = await usersService.createUser(userCreationData);
    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
});

router.put("/users/:id", async function (req, res, next) {
  var userUpdateData = req.body;
  var id = req.params.id;
  try {
    var user = await usersService.updateUser(userUpdateData, id);
    return res.status(204).json(user);
  } catch (e) {
    next(e);
  }
});

router.get("/users", async function (req, res, next) {
  try {
    var users = await usersService.getList();
    return res.json(users);
  } catch (e) {
    next(e);
  }
});

router.get("/users/:id", async function (req, res, next) {
  var id = req.params.id;
  try {
    var user = await usersService.getUser(id);
    return res.json(user);
  } catch (e) {
    next(e);
  }
});

router.delete("/users/:id", async function (req, res, next) {
  var id = req.params.id;
  try {
    await usersService.deleteUser(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
