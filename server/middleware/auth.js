const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin.js');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch user and verify admin role
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(403).json({ success: false, message: 'Access denied. Admin role required.' });
    }
    
    req.user = decoded;
    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    next();
  };
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};


module.exports = {
  protect,
  generateToken,
  authorize
};