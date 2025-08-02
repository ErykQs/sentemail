require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const emailRoutes = require('./routes/email');
const authRoutes = require('./routes/auth');
const session = require('express-session');


const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: 'sentemail_secret',
  resave: false,
  saveUninitialized: false
}));

// Routes
app.use('/auth', authRoutes);

// Middleware kiểm tra đăng nhập
function requireLogin(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect('/auth/login');
}

// Home redirect or form
app.get('/', (req, res) => {
  const loggedIn = req.session && req.session.user;
  res.render('index', {
    message: null,
    error: null,
    showLogin: !loggedIn
  });
});

app.use(requireLogin, (req, res, next) => {
  // Đảm bảo các route gửi mail luôn truyền showLogin: false
  res.locals.showLogin = false;
  next();
}, emailRoutes);

app.listen(PORT, () => {
  console.log(`SentEmail app running at http://localhost:${PORT}`);
});
