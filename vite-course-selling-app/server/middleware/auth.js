/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const SECRET = "secR3T";

const generateToken = (user) => {
  const payload = { user: user.username };
  return jwt.sign(payload, secretKey);
};

const adminAuthentication = (req, res, next) => {
  const { username, password } = req.headers;

  const admin = ADMINS.find(
    (a) => a.username === username && a.password === password
  );
  if (admin) {
    next();
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
};

const userAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  const user = USERS.find(
    (e) => e.username === username && e.password === password
  );
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(403).json({ message: "User authentication failed" });
  }
};

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  authenticateJwt,
  SECRET,
};
