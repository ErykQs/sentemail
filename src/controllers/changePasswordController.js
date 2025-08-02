const User = require('../models/User');

exports.changePassword = async (req, res) => {
  const username = req.session && req.session.user ? req.session.user.username : null;
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!username || !oldPassword || !newPassword || !confirmPassword) {
    return res.render('change-password', { message: null, error: 'Vui lòng nhập đủ thông tin.', session: req.session });
  }
  if (newPassword !== confirmPassword) {
    return res.render('change-password', { message: null, error: 'Mật khẩu mới và xác nhận không khớp!', session: req.session });
  }
  try {
    const user = await User.findOne({ username, password: oldPassword });
    if (!user) {
      return res.render('change-password', { message: null, error: 'Tài khoản hoặc mật khẩu cũ không đúng.', session: req.session });
    }
    user.password = newPassword;
    await user.save();
    console.log('[CHANGE PASSWORD] Đã cập nhật:', user);
    res.render('change-password', { message: 'Đổi mật khẩu thành công!', error: null, session: req.session });
  } catch (err) {
    res.render('change-password', { message: null, error: 'Lỗi hệ thống.', session: req.session });
  }
};
