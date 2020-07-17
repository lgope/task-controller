const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const authRouter = require('./routes/authRoutes');
const indexRouter = require('./routes/indexRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const discussRoutes = require('./routes/discussRoutes');

const app = express();

// Passport Config
require('./config/passportConfig')(passport);

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Express session
app.use(cookieParser('secret'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/task', taskRoutes);
app.use('/discuss', discussRoutes);
module.exports = app;
