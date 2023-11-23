// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/Users.js');

router.post('/login', async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).json({ message: 'Missing credentials' });
    }

    const user = await User.findOne({ Email, Password });

    if (user) {
      // Kullanıcı varsa session bilgilerini set et
      req.session.user = {
        id: user._id,
        username: user.Username,
        // Diğer kullanıcı bilgilerini ekleyebilirsin
      };
      return res.status(200).json({ message: 'Login successful', user });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { Country, Email, Password, Username, Usertype } = req.body;

    console.log(req.body);
    // Kullanıcı bilgileri kontrolü
    if (!Country || !Email || !Password || !Username || !Usertype) {
      return res.status(400).json({ message: 'yoğ amua' });
    }

    // Email ve Username'in benzersiz olup olmadığını kontrol et
    const existingUser = await User.findOne({ $or: [{ Email }, { Username }] });
    if (existingUser) {
      return res.status(409).json({ message: 'aynısı var amk' });
    }

    // Yeni kullanıcı oluştur
    const newUser = new User({ Country, Email, Password, Username, Usertype });
    await newUser.save();

    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/logout', (req, res) => {
  if (req.session && req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      } else {
        res.send('Logout successful');
      }
    });
  } else {
    // Oturum yoksa hiçbir şey yapma
    res.send('No active session');
  }
});
module.exports = router;
