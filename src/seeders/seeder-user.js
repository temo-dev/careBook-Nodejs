'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     return queryInterface.bulkInsert('Users', [{
      email: "admin@gmail.com",
      password:"123456",
      firstName: "tuan anh",
      lastName: "nguyen",
      address: "long bien",
      gender: 1,
      // roleId: DataTypes.STRING,
      // phonenumber:DataTypes.STRING,
      // positionId: DataTypes.STRING,
      // image: DataTypes.STRING,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
