const express = require('express');
const { teamApi } = require('../api/team');
const router = express.Router();

router.post('/add', teamApi.addTeamMember);
router.delete('/delete', teamApi.deleteTeamMember);
router.get('/getTeam', teamApi.getTeam);
router.get('/getTeamIds', teamApi.getTeamIds);
router.get('/runBouts', teamApi.runBouts);

module.exports = router;
