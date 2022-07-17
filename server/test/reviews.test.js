const crypto = require("crypto");
const reviewService = require("../service/reviewsService");
const usersService = require("../service/usersService");
const request = require("./utils/requestUtil");
const generate = require("./utils/generateText");
const createUser = require("./utils/createUser");

test("Should get reviews", async function () {
  const user = await createUser();
  const reviewData = {
    serieId: 1,
    userId: user.id,
    reviewText: generate(),
    reviewNote: 5,
  };
  const review = await reviewService.saveReview(reviewData);
  const response = await request(
    "http://localhost:3333/reviews",
    "get",
    "",
    user.token
  );
  const reviews = response.data;
  expect(reviews.length).toBeGreaterThan(0);
  await reviewService.deleteReview(review.id);
  await usersService.deleteUser(user.id);
});

test("Should save a review", async function () {
  const user = await createUser();
  const data = {
    serieId: 1,
    userId: user.id,
    reviewText: generate(),
    reviewNote: 0,
  };
  const response = await request(
    "http://localhost:3333/reviews",
    "post",
    data,
    user.token
  );
  expect(response.status).toBe(201);
  const review = response.data;
  expect(review.serieId).toBe(data.serieId);
  expect(review.userId).toBe(data.userId);
  expect(review.reviewText).toBe(data.reviewText);
  expect(review.reviewNote).toBe(data.reviewNote);
  await reviewService.deleteReview(review.id);
  await usersService.deleteUser(user.id);
});

test("Should update a review", async function () {
  const user = await createUser();
  const data = {
    serieId: 1,
    userId: user.id,
    reviewText: generate(),
    reviewNote: 0,
  };
  const review = await reviewService.saveReview(data);
  review.reviewText = generate();
  review.reviewNote = 4;
  const response = await request(
    `http://localhost:3333/reviews/${review.id}`,
    "put",
    review,
    user.token
  );
  expect(response.status).toBe(204);
  var updated = await reviewService.getReviewsById(review.id);
  expect(updated.reviewText).toBe(review.reviewText);
  expect(updated.reviewNote).toBe(review.reviewNote);
  await reviewService.deleteReview(review.id);
  await usersService.deleteUser(user.id);
});

test("Should delete a review", async function () {
  const user = await createUser();
  const data = {
    serieId: 1,
    userId: user.id,
    reviewText: generate(),
    reviewNote: 0,
  };
  const review = await reviewService.saveReview(data);
  const reviewsLength = (await reviewService.getReviews()).length;
  const response = await request(
    `http://localhost:3333/reviews/${review.id}`,
    "delete",
    "",
    user.token
  );
  expect(response.status).toBe(204);
  expect((await reviewService.getReviews()).length).toBe(reviewsLength - 1);
  await usersService.deleteUser(user.id);
});
