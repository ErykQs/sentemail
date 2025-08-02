const { sendMail } = require('../services/mailer');

exports.sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !text) {
    return res.render('index', { message: null, error: 'Vui lòng nhập địa chỉ người nhận và nội dung.' });
  }

  try {
    await sendMail({ to, subject: subject || 'No Subject', text });
    res.render('index', { message: 'Email đã gửi thành công!', error: null });
  } catch (err) {
    console.error('Lỗi gửi email:', err);
    res.render('index', { message: null, error: 'Gửi email thất bại. Kiểm tra lại cấu hình.' });
  }
};
