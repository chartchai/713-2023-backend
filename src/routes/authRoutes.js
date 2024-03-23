const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authModel = require('../models/authModel');
const auth = require('../middleware/auth')
require('dotenv').config();
router.post('/authenticate', async (req, res) => {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Query the database to find a user with the provided email
    const user = await authModel.findByUsername(username)

    // Return a 404 status with an error message if the user is not found
    if (!user) {
        return res.status(404).json({ message: "User doesn't exist" });
    }

    // Verify the provided password against the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // If the password is incorrect, return a 400 status with an error message
    if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid credentials" });

    console.log(process.env.JWT_SECRET)
    // If the user is authenticated, generate a JWT token
    const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "5h",
    });
    //format the user object to exclude the password and include the roles
    const outputUser = {
        id: user.id,
        name: user.organizer.name,
        roles: user.roles.map(role => role.name)
    }
    // Send a successful response with the generated token and user information
    res.status(200).json({
        status: 'success',
        access_token: token,
        user: outputUser
    })
});

router.post('/verified', auth.protect, async (req, res) => {
    res.status(200).json({
        status: 'success',
        user: req.user
    })
})
// only admin can have access to this route
router.get('/admin', auth.protect, auth.checkAdmin, (req, res) => {
    res.status(200).send('authorized page')
})

router.post('/register', async (req, res) => {
    try {
        let organizer = req.body;
        let returnOrganizer = await authModel.registerUser(organizer)
        res.status(201).json(returnOrganizer)
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' })
    }

})

router.post('/updatePassword', auth.protect, async (req, res) => {
    if (req.user.username !== req.body.username 
        || req.user.roles.map(role => role.name).indexOf('ROLE_ADMIN') === -1)
        return res.status(403).json({ message: 'Unauthorized' })

    try {
        let { username, password } = req.body
        let user = await authModel.updatePassword(username, password)
        //format the user object to exclude the password and include the roles
        const outputUser = {
            id: user.id,
            name: user.organizer.name,
            roles: user.roles.map(role => role.name)
        }
        res.status(200).json(outputUser)
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Error updating password' })
    }
})
module.exports = router;