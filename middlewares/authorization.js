const jwt = require("jsonwebtoken");
const MyException = require("../exceptions/MyException");

const config = process.env;

const verifyToken = (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
      throw new MyException("Token is required for authentication");
    }
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (error) {
    if (error instanceof MyException) {
      res
        .status(error?.status)
        .json({ error: error?.message, status: error?.status });
    } else {
      console.error(error);
      res.status(500).json({ error: "Invalid Token" });
    }
  }
  return next();
};

module.exports = verifyToken;
