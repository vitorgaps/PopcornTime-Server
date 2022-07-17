"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("series", "apiSerieId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      default: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("series", "apiSerieId");
  },
};
