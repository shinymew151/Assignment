const express = require('express');
const router = express.Router();
const authController = require('../controllers/Authentication-controller');


router.get('/register', (req, res) => {
    res.render('register'); 
});

router.post('/register', authController.register);

router.get('/login', (req, res) => {
    res.render('login'); 
});

router.get('/home', (req, res) => {
  res.render('home'); 
});

router.post('/login', authController.login);

module.exports = router;