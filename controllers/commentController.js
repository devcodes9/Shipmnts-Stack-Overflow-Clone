const Comment = require("../models/Comment");
const Answer = require("../models/Answer");
const Question = require("../models/Question");

const createComment = async (req, res) => {
  try {
    const { text, answer, question } = req.body;
    const user_id = req.user.id;

    if (!answer && !question) {
      return res.status(400).json({
        success: false,
        message: "Please provide question or answer for creating a comment",
      });
    }

    const comment = await Comment.create({
      text,
      answer,
      question,
      user: user_id,
    });

    if (!comment) {
      return res.status(401).json({
        success: false,
        message: "Please provide the necessary details for creating a comment",
      });
    }

    if (answer) {
      const updatedAnswer = await Answer.findByIdAndUpdate(
        answer,
        { $push: { comments: comment._id } },
        { new: true }
      );
      console.log(updatedAnswer);
    }

    if (question) {
      const updatedQuestion = await Question.findByIdAndUpdate(
        question,
        { $push: { comments: comment._id } },
        { new: true }
      );
      console.log(updatedQuestion);
    }

    return res.status(200).json({
      success: true,
      message: "Comment created successfully",
      data: comment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { createComment };
