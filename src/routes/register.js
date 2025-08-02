const express = require('express');
const router = express.Router();
const { register } = require('../controllers/registerController');

router.get('/', (req, res) => {
  res.render('register', { message: null, error: null });
});
router.post('/', register);

module.exports = router;
