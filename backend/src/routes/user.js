const express = require('express');
const { userApi } = require('../api/user');
const router = express.Router();

router.get('/who', userApi.getUser);

module.exports = router;
