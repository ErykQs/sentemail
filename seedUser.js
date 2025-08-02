require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sentemail', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const seed = async () => {
  const exists = await User.findOne({ username: 'admin' });
  if (!exists) {
    await User.create({ username: 'admin', password: '123456' });
    console.log('Tạo user admin thành công');
  } else {
    console.log('User admin đã tồn tại');
  }
  mongoose.disconnect();
};

seed();
