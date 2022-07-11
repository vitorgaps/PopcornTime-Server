const reviewsData = require("../data/reviewsData");

exports.getReviews = function () {
  return reviewsData.getReviews();
};

exports.getReviewsByUser = function (id) {
  return reviewsData.getReviewsByUser(id);
};

exports.getReviewsById = function (id) {
  return reviewsData.getReviewsById(id);
};

exports.saveReview = function (review) {
  return reviewsData.saveReview(review);
};

exports.updateReview = function (review, id) {
  return reviewsData.updateReview(review, id);
};

exports.deleteReview = function (id) {
  return reviewsData.deleteReview(id);
};
