const Event = require('../db/models/event');
const sequelize = require('../config/dbSequelize');
const { DataTypes, Op } = require('sequelize');
const event = Event(sequelize,DataTypes);

// Create
exports.addEvent = (eventData) => {
    return event.create(eventData)
        .then(event => event)
        .catch(error => console.error('Error creating event:', error));
}

// Read (get one event by ID)
exports.getEventById = (id) => {
    return event.findByPk(id)
        .then(event => event)
        .catch(error => console.error('Error getting event:', error));
}

// Read (get all events)
exports.getAllEvents = () => {
    return event.findAll()
        .then(events => events)
        .catch(error => console.error('Error getting events:', error));
}

exports.getEventsByPartialName = (name) => {
    return event.findAll({
        where: {
            title: {
                [Op.like]: `%${name}%`
            }
        }
    })
        .then(events => events)
        .catch(error => console.error('Error getting events:', error));
}

exports.getEventByName = (name) => {
    return event.findAll({
        where: {
            title: name
        }
    })
}