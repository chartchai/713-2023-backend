const Event = require('../db/models/eventWithOrganizer');
const sequelize = require('../config/dbSequelize');
const { DataTypes, Op } = require('sequelize');
const {Organizer:organizer} = Event(sequelize, DataTypes);
exports.getAllOrganizers = () => {
    return organizer.findAll({
        attributes: ['id', 'name'],
    })
        .then(organizers => organizers)
        .catch(error => console.error('Error getting organizers:', error));
}
