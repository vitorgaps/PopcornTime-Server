const axios = require("axios");
const crypto = require("crypto");
const reviewService = require("../service/reviewsService");
const authService = require("../route/authenticationRoute");

const generate = function () {
  return crypto.randomBytes(20).toString("hex");
};

const request = function (url, method, data) {
  return axios({ url, method, data, validateStatus: false });
};

test("Should get reviews", async function () {
  const response = await request("http://localhost:3000/reviews", "get");
  const reviews = response.data;
  expect(reviews.length).toBeGreaterThan(1);
});

test("Should save a review", async function () {
  const data = { serieId: 1, userId: 1, reviewText: generate(), reviewNote: 0 };
  const response = await request("http://localhost:3000/reviews", "post", data);
  expect(response.status).toBe(201);
  const review = response.data;
  expect(review.serieId).toBe(data.serieId);
  expect(review.userId).toBe(data.userId);
  expect(review.reviewText).toBe(data.reviewText);
  expect(review.reviewNote).toBe(data.reviewNote);
  await reviewService.deleteReview(review.id);
});

test("Should update a review", async function () {
  const data = {
    serieId: 1,
    userId: 1,
    reviewText: generate(),
    reviewNote: 0,
  };
  const review = await reviewService.saveReview(data);
  review.reviewText = generate();
  review.reviewNote = 4;
  const response = await request(
    `http://localhost:3000/reviews/${review.id}`,
    "put",
    review
  );
  expect(response.status).toBe(204);
  var updated = await reviewService.getReviewsById(review.id);
  expect(updated.reviewText).toBe(review.reviewText);
  expect(updated.reviewNote).toBe(review.reviewNote);
  await reviewService.deleteReview(review.id);
});

test("Should delete a review", async function () {
  const data = {
    serieId: 1,
    userId: 1,
    reviewText: generate(),
    reviewNote: 0,
  };
  const review = await reviewService.saveReview(data);
  const reviewsLength = (await reviewService.getReviews()).length;
  const response = await request(
    `http://localhost:3000/reviews/${review.id}`,
    "delete"
  );
  expect(response.status).toBe(204);
  expect((await reviewService.getReviews()).length).toBe(reviewsLength - 1);
});
