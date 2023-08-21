const express = require("express");
const { createAnswer, voteAnswer } = require("../controllers/answerController");
const { auth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", auth, createAnswer);
router.post("/vote", auth, voteAnswer);

module.exports = router;
