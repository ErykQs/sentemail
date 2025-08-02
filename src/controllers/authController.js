
const User = require('../models/User');

exports.login = (req, res) => {
  res.render('index', { message: null, error: null, showLogin: true });
};

exports.handleLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log('[LOGIN QUERY]', { username, password });
    const user = await User.findOne({ username: username, password: password });
    console.log('[LOGIN QUERY RESULT]', user);
    if (user) {
      console.log(`[LOGIN SUCCESS] User: ${username}`);
      req.session.user = { username: user.username };
      return res.redirect('/');
    }
    console.log(`[LOGIN FAIL] User: ${username}`);
    res.render('index', { message: null, error: 'Sai tài khoản hoặc mật khẩu.', showLogin: true });
  } catch (err) {
    console.log(`[LOGIN ERROR]`, err);
    res.render('index', { message: null, error: 'Lỗi hệ thống.', showLogin: true });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
};
