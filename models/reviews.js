const Sequelize = require("sequelize");
const database = require("../server/infra/database");

const Review = database.define(
  "review",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    serieId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    reviewText: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },

    reviewNote: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Review;
