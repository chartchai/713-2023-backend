const express = require('express');
const router = express.Router();
const participantModel = require('../models/participantModel');

router.get('/', async (req, res) => {
    const name = req.query.name;
    if (name) {
        const event = await participantModel.getEventByName(name);
        if (!event) {
            res.status(404).send('The participant with the given name was not found');
        } else {
            res.send(event);
        }
    } else {
        participantModel.getAllEvents()
            .then(participants => res.send(participants))
            .catch(err => res.status(500).send('Error getting participants'));

    }
});

router.get('/event/:id', (req, res) => {
    const id = req.params.id;
    participantModel.getEventById(id)
        .then(event => {
            if (!event) {
                res.status(404).send('The participant with the given ID was not found');
            } else {
                res.send(event);
            }
        })
        .catch(err => res.status(500).send('Error getting participant'));
});

router.post('/event/:id/participant', (req, res) => {
    const eventId = req.params.id;
    const participantData = req.body;
    participantModel.addEventParticipant(eventId, participantData)
        .then(participant => res.send(participant))
        .catch(err => res.status(500).send('Error adding participant to event'));
});

module.exports = router