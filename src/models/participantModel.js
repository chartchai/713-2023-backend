const Participant = require('../db/models/participant');
const sequelize = require('../config/dbSequelize');
const { DataTypes, Op } = require('sequelize');
const { Event: event, Participant: participant } = Participant(sequelize, DataTypes);

exports.getAllEvents = () => {
    return event.findAll({ include: ['participants'] })
        .then(events => events)
        .catch(error => console.error('Error getting events:', error));
}

exports.getEventById = (id) => {
    return event.findByPk(id, {
        include: [{
            model: participant,
            as: 'participants',
            attributes: ['name', 'phone'],
            through: {
                attributes: []
            }

        }]
    }).then(event => event)
        .catch(error => console.error('Error getting event:', error));
}

exports.getEventByName = (name) => {
    return event.findAll({
        where: {
            [Op.or]: [
                {
                    title: {
                        [Op.like]: `%${name}%`
                    }
                },
                {
                    description: {
                        [Op.like]: `%${name}%`

                    }
                }
            ]
        },
        include: [{
            model: participant,
            as: 'participants',
            attributes: ['name', 'phone'],
            through: {
                attributes: []
            }

        }]
    }).then(events => events)
        .catch(error => console.error('Error getting events:', error));
}


exports.addEventParticipant = async (eventId, participantData) => {
    try {
        const createdParticipant = await participant.create(participantData);
        const foundEvent = await event.findByPk(eventId);
        await foundEvent.addParticipant(createdParticipant);
        return createdParticipant;
    } catch (error) {
        console.error('Error adding participant:', error);
    }
}
