const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  const { name, email, age, password } = req.body;

  try {
    const user = new User({ name, email, age, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      res.json({ success: true, message: 'User login successful', user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;