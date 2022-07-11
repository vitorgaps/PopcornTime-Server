const Sequelize = require("sequelize");
const database = require("../server/infra/database");

const User = database.define(
  "user",
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

    email: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },

    password: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
