const express = require('express');
const { createQuestion, deleteQuestion, getAllQuestions, updateQuestion, voteQuestion } = require('../controllers/questionController');
const { auth, verifyQuestionOperation } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', auth, createQuestion);
router.post("/vote", auth, voteQuestion);
router.delete('/delete/:id', auth, verifyQuestionOperation, deleteQuestion);
router.put('/update/:id', auth, verifyQuestionOperation, updateQuestion);
router.get('/', auth, getAllQuestions)

module.exports = router;