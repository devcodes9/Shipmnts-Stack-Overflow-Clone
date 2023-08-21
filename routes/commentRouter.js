const express = require("express");
const { createComment } = require("../controllers/commentController");
const { auth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", auth, createComment);

module.exports = router;