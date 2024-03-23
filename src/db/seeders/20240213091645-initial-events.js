'use strict';

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
    await queryInterface.bulkInsert('event', 
    [
      {       
        "category": "animal welfare",
        "title": "Cat Adoption Day",
        "description": "Find your new feline friend at this event.",
        "location": "Meow Town",
        "date": "January 28, 2022",
        "time": "12:00",
        "petAllowed": true,
        "organizerId": 1
      },
      {
       
        "category": "food",
        "title": "Community Gardening",
        "description": "Join us as we tend to the community edible plants.",
        "location": "Flora City",
        "date": "March 14, 2022",
        "time": "10:00",
        "petAllowed": true,
        "organizerId": 1
      },
      {
       
        "category": "sustainability",
        "title": "Beach Cleanup",
        "description": "Help pick up trash along the shore.",
        "location": "Playa Del Carmen",
        "date": "July 22, 2022",
        "time": "11:00",
        "petAllowed": false,
        "organizerId": 2
      },
      {
       
        "category": "animal welfare",
        "title": "Dog Adoption Day",
        "description": "Find your new canine friend at this event.",
        "location": "Woof Town",
        "date": "August 28, 2022",
        "time": "12:00",
        "petAllowed": true,
        "organizerId": 3
      },
      {
       
        "category": "food",
        "title": "Canned Food Drive",
        "description": "Bring your canned food to donate to those in need.",
        "location": "Tin City",
        "date": "September 14, 2022",
        "time": "3:00",
        "petAllowed": true,
        "organizerId": 2
      },
      {        
        "category": "sustainability",
        "title": "Highway Cleanup",
        "description": "Help pick up trash along the highway.",
        "location": "Highway 50",
        "date": "July 22, 2022",
        "time": "11:00",
        "petAllowed": false,
        "organizerId": 3,
        
      }
    ], 
    {});
    await queryInterface.bulkInsert('images', [
      {
        "eventId": 1,
        "url": "https://storage.googleapis.com/image-upload-750b0.appspot.com/2.png"
      }
    ],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('event', null, {});
  }
};
