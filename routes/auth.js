// auth.js

const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.redirect('/auth/login');
  } catch (err) {
    console.error('Error registering new user:', err);
    res.status(500).send(`Error registering new user: ${err.message}`);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && await user.comparePassword(password)) {
      req.session.userId = user._id;
      res.redirect('/blog');
    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send(`Error logging in: ${err.message}`);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/auth/login');
  });
});

module.exports = router;
