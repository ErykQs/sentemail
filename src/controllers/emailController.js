
const { sendMail } = require('../services/mailer');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

exports.uploadMiddleware = upload.array('attachments');

exports.sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;
  const files = req.files;

  if (!to || !text) {
    return res.render('index', { message: null, error: 'Vui lòng nhập địa chỉ người nhận và nội dung.' });
  }

  let attachments = [];
  if (files && files.length > 0) {
    attachments = files.map(file => ({
      filename: file.originalname,
      content: file.buffer
    }));
  }

  try {
    await sendMail({ to, subject: subject || 'No Subject', text, attachments });
    res.render('index', { message: 'Email đã gửi thành công!', error: null });
  } catch (err) {
    console.error('Lỗi gửi email:', err);
    res.render('index', { message: null, error: 'Gửi email thất bại. Kiểm tra lại cấu hình.' });
  }
};
