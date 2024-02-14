const jwt = require('jsonwebtoken');
require("dotenv").config();

const authorizedOnly = (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token);
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    // extract token from Bearer.
    let bearer = "";
    if(token.split(' ')[0] === 'Bearer') {
        bearer = token.split(' ')[1]
    }
    console.log(bearer);
    // Verify the token
    const decoded = jwt.verify(bearer, process.env.SECRET);
    console.log("-------------")
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Invalid JWT auth failed', error);
    return res.status(403).json({ success: false, message: 'Invalid Auth Token' });
  }
};

module.exports = authorizedOnly;
