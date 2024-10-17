const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../model/userData');

// Middleware to handle JSON data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// POST /user route for login
router.post('/', async (req, res) => {
    const user = await userModel.findOne({ username: req.body.username });
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    try {
        if (user.password === req.body.password) {
            const payload = { uname: req.body.username, pwd: req.body.password };
            const token = jwt.sign(payload, "secret");
            return res.status(200).json({ message: "Login Successful", usertoken: token });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// GET /user route to retrieve all users
router.get('/', async (req, res) => {
    try {
        const users = await userModel.find(); // Retrieves all users
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
});

module.exports = router;
