'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    
    await queryInterface.createTable('event', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING
        // allowNull defaults to true
      },
      date: {
        type: Sequelize.STRING
        // allowNull defaults to true
      },
      time: {
        type: Sequelize.STRING
        // allowNull defaults to true
      },
      petAllowed: {
        type: Sequelize.BOOLEAN
        // allowNull defaults to true
      }, createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },{
      autoTimeStamp: true, // Add createdAt and updatedAt fields

    });
    
    await queryInterface.addColumn('event', 'organizerId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'organizer',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.createTable('images', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      eventId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'event',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      url: {
        type: Sequelize.STRING,
      }
    }, {
      autoTimeStamp: false, // Add createdAt and updatedAt fields

    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('event', 'organizerId');
    await queryInterface.dropTable('images');
    await queryInterface.dropTable('event');
  }
};
