require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    // Tạo user admin
    const existsAdmin = await User.findOne({ username: 'admin' });
    if (!existsAdmin) {
      await User.create({ username: 'admin', password: '123456' });
      console.log('Tạo user admin thành công');
    } else {
      console.log('User admin đã tồn tại');
    }

    // Tạo hoặc cập nhật mật khẩu user diemnv
    const existsDiemnv = await User.findOne({ username: 'diemnv' });
    if (!existsDiemnv) {
      await User.create({ username: 'diemnv', password: '123456' });
      console.log('Tạo user diemnv thành công');
    } else {
      await User.updateOne({ username: 'diemnv' }, { password: '123456' });
      console.log('Đã cập nhật mật khẩu user diemnv thành 123456');
    }
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Lỗi kết nối MongoDB:', err);
  });
