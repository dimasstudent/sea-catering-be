// // src/middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const config = require('../config/config');

// exports.verifyToken = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1];

//   if (!token) {
//     return res.status(403).send({ message: 'No token provided!' });
//   }

//   jwt.verify(token, config.secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({ message: 'Unauthorized!' });
//     }
//     req.userId = decoded.id;
//     next();
//   });
// };