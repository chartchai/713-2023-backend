const express = require('express');
const router = express.Router();
const eventModel = require('../models/eventModel');
router.get('/', (req, res) => {
    const name = req.query.name;
    if (name) {
        eventModel.getEventsByPartialName(name, (err, results) => {
            const event = results;
            if (!event) {
                res.status(404).send('The event with the given name was not found');
            } else {
                res.send(event);
            }
        });
    }
    else {
        eventModel.getAllEvents((err, results) => {
            if (err) {
                res.status(500).send('Error getting events');
                return;
            }
            res.send(results);
        })
    }
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    eventModel.getEventById(id, (err, results) => {
        const event = results;
        if (!event) {
            res.status(404).send('The event with the given ID was not found');
        } else {
            res.send(event);
        }
    });
});

router.post('/', (req, res) => {
    const event = req.body;
    eventModel.addEvents(event, (err, results) => {
        if (err) {
            res.status(500).send('Error adding event');
            return;
        }
        else {
            event.id = results.insertId;

            res.send(event);
        }
    });

});
module.exports = router;