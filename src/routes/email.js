
const express = require('express');
const router = express.Router();
const { sendEmail, uploadMiddleware } = require('../controllers/emailController');

router.post('/send', uploadMiddleware, sendEmail);


module.exports = router;
