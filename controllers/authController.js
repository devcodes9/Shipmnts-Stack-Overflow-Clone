const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, username, email, contactNumber, password } = req.body;

    if (!name || !email || !username || !password) {
      return res.status(403).json({
        success: false,
        message: "Please fill the mandatory fields",
      });
    }
    const existingUser = await User.findOne({ username });
    // console.log(existingUser);
    if (existingUser) {
      return res.status(403).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      username,
      contactNumber,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(403).json({
        success: false,
        message: "Please fill the mandatory fields",
      });
    }

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(403).json({
        success: false,
        message: "User doesn't exist, Please sign up",
      });
    }

    const passCheck = await bcrypt.compare(password, existingUser.password);

    if (!passCheck) {
      return res.status(403).json({
        success: false,
        message: "Please enter correct password",
      });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        username: existingUser.username,
      },
      process.env.JWT_SECRET
    );

    existingUser.token = token;
    existingUser.password = undefined;

    res.cookie("token", token, { httpOnly: true }).status(200).json({
      success: true,
      token,
      existingUser,
      message: "User Logged in successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { signup, login };
