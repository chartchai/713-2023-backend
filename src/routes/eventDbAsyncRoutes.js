const express = require('express');
const router = express.Router();
const eventModel = require('../models/eventSequelizeEventOrganizationModel');
router.get('/', async (req, res) => {
    
    const limit = parseInt(req.query._limit);
    const page = parseInt(req.query._page);
    const title = req.query.title ;
    
    if (limit && page) {
        try {
            const events = await eventModel.getPaginationWithQueryTitleEvent(page, limit,title);
            if (!events) {
                res.status(404).send('The event with the given name was not found');
            } else {
                res.setHeader('x-total-count', events.count);
                res.header('Access-Control-Expose-Headers', 'x-total-count');
                res.send(events.rows);
            }
        } catch (err) {
            res.status(500).send('Error getting events');
        }
    }else{
        try{
            const events =  await eventModel.getAllEvents();
            res.send(events);
        }catch(err){
            res.status(500).send('Error getting events');
        }
        
    }    
});
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const event = await eventModel.getEventById(id);
        if (!event) {
            res.status(404).send('The event with the given ID was not found');
        } else {
            res.send(event);
        }
    } catch (err) {
        res.status(500).send('Error getting event');
    }
});

router.post('/', async (req, res) => {
    try {
        const event = req.body;
        const eventId = await eventModel.addEvent(event);
        res.send(eventId.dataValues);
    } catch (err) {
        res.status(500).send('Error adding event');
    }
});
module.exports = router;