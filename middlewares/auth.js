const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
  if (!req.headers || !req.headers['authorization']) {
    return res.status(403).send('A token is required for authentication');
  }

  const token = req.headers['authorization'].split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    res.locals = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

const verifyAndSendToken = (token) => {
  if (!token) throw Error(`No token found`);

  return jwt.verify(token.split(' ')[1], config.JWT_SECRET);
};

module.exports = { verifyToken, verifyAndSendToken };
