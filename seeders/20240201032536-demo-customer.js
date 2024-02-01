"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Customers", [
      {
        id: 1,
        name: "John Doe",
        phone: "0875124851",
        email: "john_doe@gmail.com",
        address: "Jl TB Simatupang",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 2,
        name: "Cristine Alberto",
        phone: "08123515245",
        email: "cristine@gmail.com",
        address: "Jl Dewi Sartika",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 3,
        name: "Michael Anderson",
        phone: "08568234734",
        email: "anderson@gmail.com",
        address: "Jl Sudirman",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 4,
        name: "Veronica Yang",
        phone: "08912352312",
        email: "veronika@gmail.com",
        address: "Jl Gatot Subroto",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Customers", null, {});
  },
};
