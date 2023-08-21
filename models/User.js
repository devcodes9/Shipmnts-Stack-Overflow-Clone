const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      trim: true,
    },
    voteList: [
      {
        question: { type: Schema.Types.ObjectId, ref: "Question" },
        answer: { type: Schema.Types.ObjectId, ref: "Answer" },
        voteType: { type: String, enum: ["upvote", "downvote"], required: true},
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
