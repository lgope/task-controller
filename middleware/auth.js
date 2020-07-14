const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

exports.ensureAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (user.role === 'user') {
      return res.status(401).json({ msg: 'You are not allowed!' });
    }

    next();
  } catch (error) {
    res.status(400).json({ msg: 'Someting went wrong!' });
  }
};

exports.ensureUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (user.role === 'admin') {
      return res.status(401).json({ msg: 'You are not allowed!' });
    }

    next();
  } catch (error) {
    res.status(400).json({ msg: 'Someting went wrong!' });
  }
};
