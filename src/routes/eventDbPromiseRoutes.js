const express = require('express');
const router = express.Router();
const eventModel = require('../models/eventPromiseModel');
router.get('/', (req, res) => {
    const name = req.query.name;
    if (name) {
        eventModel.getEventsByPartialName(name)
            .then(events => {
                if (!events) {
                    res.status(404).send('The event with the given name was not found');
                } else {
                    res.send(events);
                }
            })
            .catch(err => res.status(500).send('Error getting events'));
    }else{
        eventModel.getAllEvents()
            .then(events => res.send(events))
            .catch(err => res.status(500).send('Error getting events'));
    }    
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    eventModel.getEventById(id)
        .then(event => {
            if (!event) {
                res.status(404).send('The event with the given ID was not found');
            } else {
                res.send(event);
            }
        })
        .catch(err => res.status(500).send('Error getting event'));
});

router.post('/', (req, res) => {
    const event = req.body;
    eventModel.addEvent(event)
        .then(eventId => {
            event.id = eventId;
            res.send(event);
        })
        .catch(err => res.status(500).send('Error adding event'));
});
module.exports = router;