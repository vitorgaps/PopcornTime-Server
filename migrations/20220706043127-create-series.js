"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("series", {
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
        defaultValue: 0,
      },

      ratingNumber: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("series");
  },
};
