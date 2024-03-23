const Event = require('../db/models/eventWithOrganizer');
const sequelize = require('../config/dbSequelize');
const { DataTypes, Op } = require('sequelize');
const { Event: event, Organizer: organizer, Images: images } = Event(sequelize, DataTypes);
// Create
exports.addEvent = async (eventData) => {
    if (eventData.organizerId === undefined) {
        // set default organizerId
        eventData.organizerId = 1;
    }
    try{
    let newEvent = await event.create(eventData)
    let newEventId = newEvent.id;
    let newImages = eventData.images.map(image => {
        return images.create({
            eventId: newEventId,
            url: image
        })        
    });
    let addedImages = await Promise.all(newImages);
    newEvent.images = eventData.images;
    return newEvent
    }catch(error){
        
        console.error('Error creating event:', error)
    }
}

// Read (get one event by ID)
exports.getEventById = (id) => {
    return event.findByPk(id,{
        include: [{
            model: images,
            as: 'images',
            attributes: ['url']
        }],
        exclude: ['id']
    
    })
        .then(event => {
            if (event) {
            let outputEvent = event.toJSON();
            outputEvent.images = outputEvent.images.map(image => image.url);
            return outputEvent;
            } else {
                return event;
            }
        })
        .catch(error => console.error('Error getting event:', error));
}

// Read (get all events)
exports.getAllEvents = () => {
    return event.findAll({
        attributes: ['id', 'time', 'title', 'date'],
    })
        .then(events => events)
        .catch(error => console.error('Error getting events:', error));
}
exports.getPaginationEvent = (page, limit) => {
    return event.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        include: [{
            model: organizer,
            as: 'organizer',
            attributes: ['id', 'name']
        }]
    })
        .then(events => events)
        .catch(error => console.error('Error getting events:', error));
}

exports.getPaginationWithQueryTitleEvent = (page, limit, title) => {
    if (!title) {
        return event.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit,
            include: [{
                model: organizer,
                as: 'organizer',
                attributes: ['id', 'name']
            }]
        })
            .then(events => events)
            .catch(error => console.error('Error getting events:', error));
    } else {
        return executeRawQueryCheckTitleAndOrganizationName(title)
            .then(events => events)
            .catch(error => console.error('Error getting events:', error));
    }
}

async function executeRawQueryCheckTitleAndOrganizationName(title) {
    let countQuery = `SELECT COUNT(*) as count FROM event 
            LEFT JOIN organizer ON event.organizerId = organizer.id 
            WHERE event.title LIKE :title 
                    OR event.description LIKE :title
                    OR organizer.name LIKE :title`;
    let dataQuery = `SELECT event.*, organizer.* FROM event 
            LEFT JOIN organizer ON event.organizerId = organizer.id 
            WHERE event.title LIKE :title 
                    OR event.description LIKE :title
                    OR organizer.name LIKE :title`;
    let replacements = { title: `%${title}%` };
    let countPromise = sequelize.query(countQuery, { replacements, type: sequelize.QueryTypes.SELECT });
    let dataPromise = sequelize.query(dataQuery, { replacements, type: sequelize.QueryTypes.SELECT });

    return Promise.all([countPromise, dataPromise])
        .then(([countResult, dataResult]) => {
            dataResult.forEach((event) => {
                event.organizer = {
                    id: event['organizerId'],
                    name: event['name']
                };
            });
            return {count: countResult[0].count, rows: dataResult};
            
            return {
                count: countResult[0].count,
                rows: dataResult
            };
        })
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