const express = require('express');
const router = express.Router();
const organizerModel = require('../models/organizerModel');
router.get('/', async (req, res) => {
    try {
        const organizers = await organizerModel.getAllOrganizers();
        res.send(organizers);
    } catch (err) {
        res.status(500).send('Error getting organizers');
    }
});
module.exports = router;