const MyException = require("../exceptions/MyException");

const validateRequest = (req, res, next) => {
  try {
    if (req.method === "GET") {
      // Check if query parameters exist
      if (Object.keys(req.query).length === 0) {
        throw new MyException("No query parameters provided.");
      }
      // Additional GET request validation can be added here
    } else if (req.method === "POST") {
      // Check if request body exists
      if (!JSON.parse(req.body)) {
        throw new MyException("Please provide valid json.");
      }
      if (!req.body || Object.keys(req.body).length === 0) {
        throw new MyException("Request body is empty.");
      }
      // Additional POST request validation can be added here
    }
  } catch (error) {
    if (error instanceof MyException) {
      res
        .status(error?.status)
        .json({ error: error?.message, status: error?.status });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  }
  next();
};
module.exports = validateRequest;
