const express = require('express');
const { auth } = require('../middlewares/authMiddleware');
const { searchQuestions } = require('../controllers/searchSortController');

const router = express.Router();

router.get('/', auth, searchQuestions);

module.exports = router