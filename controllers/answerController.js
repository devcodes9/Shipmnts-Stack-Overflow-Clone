const Answer = require("../models/Answer");
const Question = require("../models/Question");
const User = require("../models/User");
const { validateVoteType } = require("../utils/validation");

const createAnswer = async (req, res) => {
  try {
    const { text, question } = req.body;
    const user_id = req.user.id;

    const answer = await Answer.create({
      text,
      question,
      user: user_id,
    });

    if (!answer) {
      return res.status(401).json({
        success: false,
        message: "Please fill mandatory details for creating an answer",
      });
    }

    const questionDoc = await Question.findByIdAndUpdate(
      question,
      { $push: { answers: answer._id } },
      { new: true }
    );

    if (!questionDoc) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Answer created successfully",
      data: answer,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const voteAnswer = async (req, res) => {
  try {
    const { answer, voteType } = req.body;
    const userId = req.user.id;

    if (!voteType || (voteType !== "upvote" && voteType !== "downvote")) {
      return res.status(400).json({
        success: false,
        message: "Invalid voteType",
      });
    }

    const answerDoc = await Answer.findById(answer);

    if (!answerDoc) {
      return res.status(404).json({
        success: false,
        message: "Answer not found",
      });
    }

    const user = await User.findById(userId);
    console.log("I am the user: ", user);
    const voteIdx = user.voteList.findIndex(
      (vote) => vote.answer && vote.answer.toString() === answer
    );

    flag = false;

    if (voteIdx !== -1) {
      // to able to change the vote Type
      if (validateVoteType(voteType)) {
        flag = true;

        return res.status(401).json({
          success: false,
          message: `You have already done ${voteType}`,
        });
      } else {
        user.voteList[voteIdx].voteType = voteType;
      }
    } else {
      user.voteList.push({ answer, voteType });
    }

    if (!flag) {
      if (voteType === "upvote") {
        answerDoc.votes += 1;
      } else {
        answerDoc.votes -= 1;
      }
    }

    await user.save();
    await answerDoc.save();

    return res.status(200).json({
      success: true,
      message: `Answer ${voteType} done successfully`,
      data: answerDoc,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { createAnswer, voteAnswer };
