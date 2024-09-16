const express = require('express');
const { superheroApi } = require('../api/superhero');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/getSuperheroes', superheroApi.getSuperheroes);
router.get('/getSuperheroDetails', superheroApi.getSuperheroDetails);
router.get('/recommendations', superheroApi.getRecommendations);
router.patch(
	'/setSuperheroDetails',
	authMiddleware.isAdmin,
	superheroApi.setSuperheroDetails
);

module.exports = router;
