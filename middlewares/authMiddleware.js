const jwt = require("jsonwebtoken");
const Question = require("../models/Question");

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token Not Found" });
    }

    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);

      req.user = decode;
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating token",
    });
  }
};

const verifyQuestionOperation = async (req, res, next) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const questionDoc = await Question.findById(id);


    if (!questionDoc) {
      return res.status(401).json({
        success: false,
        message: "Question not found",
      });
    }


    if (questionDoc.user.toString() !== user.id) {
      return res.status(500).json({
        success: false,
        message: "You are not authorized to update or delete this question",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { auth, verifyQuestionOperation };
