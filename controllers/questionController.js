const Question = require("../models/Question");
const User = require("../models/User");
const { validateVoteType } = require("../utils/validation");

const createQuestion = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user_id = req.user.id;
    console.log("Creating...", req.user);
    const question = await Question.create({
      title,
      description,
      user: user_id,
    });

    if (!question) {
      return res.status(401).json({
        success: false,
        message: "Please fill mandatory details for creating question",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Question created successfully",
      data: question,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(401).json({
        success: false,
        message: "question not found",
      });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Question updated successfully",
      data: updatedQuestion,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const question = await Question.findById(id);

    if (!question) {
      return res.status(401).json({
        success: false,
        message: "Question not found",
      });
    }

    const deletedQuestion = await Question.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Question deleted successfully",
      data: deletedQuestion,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find(req.query);

    if (questions.length === 0) {
      return res.status(401).json({
        success: false,
        message: "No Questions found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Questions found",
      data: questions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const voteQuestion = async (req, res) => {
  try {
    const { question, voteType } = req.body;
    const userId = req.user.id;

    if (validateVoteType(voteType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid voteType",
      });
    }

    const questionDoc = await Question.findById(question);

    if (!questionDoc) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    const user = await User.findById(userId);

    const voteIdx = user.voteList.findIndex(
      (vote) => vote.question && vote.question.toString() === question
    );

    flag = false;

    if (voteIdx !== -1) {
      // Check if user is changing voteType
      if (voteType === user.voteList[voteIdx].voteType) {
        flag = true;

        return res.status(401).json({
          success: false,
          message: `You have already done ${voteType}`,
        });
      } else {
        user.voteList[voteIdx].voteType = voteType;
      }
    } else {
      user.voteList.push({ question, voteType });
    }

    if (!flag) {
      if (voteType === "upvote") {
        questionDoc.votes += 1;
      } else {
        questionDoc.votes -= 1;
      }
    }

    await user.save();
    await questionDoc.save();

    return res.status(200).json({
      success: true,
      message: `Question ${voteType} done successfully`,
      data: questionDoc,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  updateQuestion,
  voteQuestion,
};
