'use strict';
const bcrypt = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('roles',[
      {id: 1, name:'ROLE_ADMIN'},
      {id: 2, name:'ROLE_USER'}
    ])
    let numSaltArounds = 10
    await queryInterface.bulkInsert('users',[
      {id: 1, username: 'admin', password: await bcrypt.hash('admin',numSaltArounds), organizerId: 1},
      {id: 2, username: 'user', password: await bcrypt.hash('user',numSaltArounds), organizerId: 2}
    ])
    await queryInterface.bulkInsert('user-role',[
      {id: 1, userId: 1, roleId: 1},
      {id: 2, userId: 1, roleId: 2},
      {id: 3, userId: 2, roleId: 2}
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user-role', null, {})
    await queryInterface.bulkDelete('roles', null, {})
    await queryInterface.bulkDelete('users', null, {})


  }
};
