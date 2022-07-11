const Sequelize = require("sequelize");
const database = require("../server/infra/database");

const ListItem = database.define(
  "listItem",
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

    watched: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },

    onList: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = ListItem;
