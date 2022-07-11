const Sequelize = require("sequelize");
const database = require("../server/infra/database");

const Serie = database.define(
  "serie",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },

    imageUrl: {
      type: Sequelize.STRING(150),
      allowNull: true,
    },

    description: {
      type: Sequelize.STRING(500),
      allowNull: true,
    },

    ratingAverage: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },

    ratingNumber: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Serie;
