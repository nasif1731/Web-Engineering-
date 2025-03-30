// config/jwt.js
module.exports = {
    secret: process.env.JWT_SECRET,
    expiresIn: '1d',
  };
  