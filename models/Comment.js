const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = Schema(
  {
    text: {
      type: String,
      required: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    answer: {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Commment", commentSchema);
