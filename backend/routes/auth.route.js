const express = require('express');
const { runValidation } = require('../validators');
const { 
  userSignupValidator,
  userSigninValidator } = require('../validators/auth.validator');
const { 
  signup, 
  signin, 
  logout, 
  protect } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/logout', logout);

module.exports = router;