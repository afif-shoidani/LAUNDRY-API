"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles_data = [
      {
        id: "1",
        name: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        name: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Tambahkan data pengguna lainnya di sini (jika diperlukan)
    ];
    await queryInterface.bulkInsert("roles", roles_data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
