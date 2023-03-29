const userModel = require("../models/userModel");
const userService = require("../services/userService");

//login callback
const loginController = async (req, res) => {
  try {
    return await userService.login(req.body.email, req.body.password, res);
  } catch (err) {
    // res.status(500).send("Internal Server Error");
  }
};

//register callback
const registerController = async (req, res) => {
  try {
    return await userService.register(
      req.body.name,
      req.body.email,
      req.body.password,
      res
    );
  } catch (err) {
    // res.status(500).send("Internal Server Error");
  }
};

module.exports = { loginController, registerController };
