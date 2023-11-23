// routes/login.js

const express = require('express');
const router = express.Router();
const User = require('../models/Users.js');

router.get('/', (req, res) => {
    res.send('Login Page');
});

router.post('/', async (req, res) => {
    try {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({ message: 'Missing credentials' });
        }

        const user = await User.findOne({ Email, Password });

        return user ? res.status(200).json({ message: 'Login successful', user }) : res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
