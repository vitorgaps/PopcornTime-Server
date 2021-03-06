const express = require("express");
const router = express.Router();
const reviewsService = require("../service/reviewsService");
const verifyJWT = require("./authVerify/verifyJWT");

router.get("/reviews", verifyJWT, async function (req, res, next) {
  try {
    var reviews = await reviewsService.getReviews();
    return res.json(reviews);
  } catch (e) {
    next(e);
  }
});

router.get("/reviews/:id", verifyJWT, async function (req, res, next) {
  try {
    var reviews = await reviewsService.getReviewsById(req.params.id);
    return res.json(reviews);
  } catch (e) {
    next(e);
  }
});

router.get("/reviews/user/:id", verifyJWT, async function (req, res, next) {
  try {
    var reviews = await reviewsService.getReviewsByUser(req.params.id);
    return res.json(reviews);
  } catch (e) {
    next(e);
  }
});

router.post("/reviews", verifyJWT, async function (req, res, next) {
  const post = req.body;
  try {
    const newReview = await reviewsService.saveReview(post);
    res.status(201).json(newReview);
  } catch (e) {
    next(e);
  }
});

router.put("/reviews/:id", verifyJWT, async function (req, res, next) {
  try {
    var review = req.body;
    await reviewsService.updateReview(review, req.params.id);
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
});

router.delete("/reviews/:id", verifyJWT, async function (req, res, next) {
  try {
    await reviewsService.deleteReview(req.params.id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
