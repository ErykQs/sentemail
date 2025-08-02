const express = require('express');
const router = express.Router();
const { changePassword } = require('../controllers/changePasswordController');

function requireLogin(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect('/auth/login');
}

router.get('/', requireLogin, (req, res) => {
  res.render('change-password', { message: null, error: null, session: req.session });
});
router.post('/', requireLogin, changePassword);

module.exports = router;
