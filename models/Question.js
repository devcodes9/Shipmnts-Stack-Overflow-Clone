const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    answers: [{
      type: Schema.Types.ObjectId,
      ref: "Answer"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
