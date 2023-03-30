const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const MyException = require("../exceptions/MyException");
const bcrypt = require("bcrypt");
const emailValidator = require("deep-email-validator");

const login = async (email, password, res) => {
  try {
    if (!email || !password) {
      throw new MyException("Please provide email or password");
    }
    const mail = await emailValidator.validate(email);
    if (mail.valid === false) {
      throw new MyException("Please provide valid email.");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new MyException("User not Exist.");
    }
    const pass = await bcrypt.compare(password, user.password);
    if (pass == false) {
      throw new MyException("Wrong password.");
    }
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    res.status(200).json({ success: true, status: 200, data: user });
  } catch (error) {
    if (error instanceof MyException) {
      res
        .status(error?.status)
        .json({ error: error?.message, status: error?.status });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const register = async (name, email, password, res) => {
  try {
    if (!name || !email || !password) {
      throw new MyException("Please provide all details");
    }
    const mail = await emailValidator.validate(email);
    if (mail.valid === false) {
      throw new MyException("Please provide valid email.");
    }
    const oldUser = await userModel.findOne({ email });
    if (oldUser) {
      throw new MyException("User Already Exist. Please Login");
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    //create token
    const token = jwt.sign(
      { user_id: newUser._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    newUser.token = token;
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    if (error instanceof MyException) {
      res
        .status(error?.status)
        .json({ error: error?.message, status: error?.status });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = { login, register };
