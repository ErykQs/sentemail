const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.render('index', { message: null, error: 'Vui lòng nhập tài khoản và mật khẩu.', showLogin: true });
  }
  try {
    const exists = await User.findOne({ username });
    if (exists) {
      return res.render('index', { message: null, error: 'Tài khoản đã tồn tại.', showLogin: true });
    }
    const newUser = await User.create({ username, password });
    console.log('[REGISTER] Đã ghi vào DB:', newUser);
    res.render('index', { message: 'Tạo tài khoản thành công! Bạn có thể đăng nhập.', error: null, showLogin: true });
  } catch (err) {
    res.render('index', { message: null, error: 'Lỗi hệ thống.', showLogin: true });
  }
};
