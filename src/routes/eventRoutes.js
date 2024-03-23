const express = require('express');
const router = express.Router();
const { getEventsByName, getEventsByPartialName, getAllEvents, addEvents } = require('../models/eventModel');


router.get('/', (req, res) => {
    const name = req.query.name;
    if (name) {
        const event = getEventsByPartialName(name);
        if (!event) {
            res.status(404).send('The event with the given name was not found');
        } else {
            res.send(event);
        }
    } else {
        res.send(getAllEvents());
    }
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const event = getAllEvents().find(event => event.id === parseInt(id));
    if (!event) {
        res.status(404).send('The event with the given ID was not found');
    } else {
        res.send(event);
    }
});

router.post('/', (req, res) => {
    const event = req.body;
    addEvents(event);
    res.send(event);
});
module.exports = router;