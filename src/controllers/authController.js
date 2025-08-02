
const users = [{ username: 'admin', password: '123456' }];

exports.login = (req, res) => {
  res.render('index', { message: null, error: null, showLogin: true });
};

exports.handleLogin = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.user = user;
    return res.redirect('/');
  }
  res.render('index', { message: null, error: 'Sai tài khoản hoặc mật khẩu.', showLogin: true });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
};
