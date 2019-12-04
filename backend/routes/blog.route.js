const express = require('express');
const { test } = require('../controllers/blog.controller');

const router = express.Router();

router.get('/', test);

module.exports = router;