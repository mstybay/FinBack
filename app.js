// app.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const crypto = require('crypto');
const authRouter = require('./routes/auth.js');
require('./helpers/db.js')();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Oturum ayarları
const secretKey = crypto.randomBytes(32).toString('hex');

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));

// Global user middleware
app.use((req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
  }
  next();
});

// Middleware
const check = (req, res, next) => {
  console.log('Middleware is running');
  if (req.user) {
    // Kullanıcı oturum açtıysa devam et
    next();
  } else {
    res.redirect('/login'); // Varsayılan login rotası
  }
};

app.get('/', check, (req, res) => {
  res.send(`Hello ${req.user.username}`);
});

app.use(authRouter);
app.post('/updateProfile', (req, res) => {
  res.send(req.user);
}
);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
