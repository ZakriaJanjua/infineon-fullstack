const express = require('express');
const { authApi } = require('../api/auth');
const router = express.Router();

router.post('/signUp', authApi.signUp);
router.post('/signIn', authApi.signIn);

module.exports = router;
