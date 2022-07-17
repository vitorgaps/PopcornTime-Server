const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authenticationService = require("../service/authenticationService");

router.post("/login", async (req, res, next) => {
  const user = req.body;
  try {
    const id = await authenticationService.authenticate(user);
    if (id > 0) {
      const token = jwt.sign({ id: id }, process.env.SECRET, {
        expiresIn: 300,
      });
      return res.json({ auth: true, token: token });
    } else {
      res.json({ auth: false, token: null });
    }
  } catch (e) {
    next(e);
  }
});

router.post("/logout", (req, res, next) => {
  res.json({ auth: false, token: null });
});

module.exports = router;
