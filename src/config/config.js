// src/config/config.js
module.exports = {
  secret: process.env.JWT_SECRET || 'your-secret-key',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/rest-sea-catering'
};