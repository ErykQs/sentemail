const nodemailer = require('nodemailer');


let transporterConfig;
switch ((process.env.EMAIL_SERVICE || 'gmail').toLowerCase()) {
  case 'gmail':
    transporterConfig = {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    };
    break;
  case 'yahoo':
    transporterConfig = {
      service: 'yahoo',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    };
    break;
  case 'outlook':
    transporterConfig = {
      service: 'hotmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    };
    break;
  case 'icloud':
    transporterConfig = {
      host: 'smtp.mail.me.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: 'SSLv3'
      }
    };
    break;
  default:
    transporterConfig = {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    };
}

const transporter = nodemailer.createTransport(transporterConfig);


async function sendMail({ to, subject, text, attachments }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments: attachments || []
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
