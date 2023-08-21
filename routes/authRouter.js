const express = require('express');
const { login, signup } = require('../controllers/authController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/login', login);
router.post('/signup', signup);

//testing protected routes for auth middleware
router.get("/test", auth, (req,res) =>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for TESTS',
    });
});


module.exports = router;