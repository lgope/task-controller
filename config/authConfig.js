module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/auth/login');
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');
  },

  ensureAdmin: function (req, res, next) {
    if (req.user.role === 'admin') {
      return next();
    }
    res.redirect('/dashboard');
  },
  ensureUser: function (req, res, next) {
    if (req.user.role === 'user') {
      return next();
    }
    res.redirect('/dashboard');
  },
};
