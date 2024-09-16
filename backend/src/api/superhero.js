const { Superhero } = require('../models/Superhero');
const { SuperheroRecommendation } = require('../utils/SuperheroRecommendation');

async function getSuperheroes(req, res, next) {
	try {
		const { page } = req.query;
		const data = await Superhero.find({})
			.select('name id image.url biography.full-name')
			.skip((page - 1) * 24)
			.limit(24);
		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
}

async function getSuperheroDetails(req, res, next) {
	try {
		const { name } = req.query;
		const data = await Superhero.findOne({ name });
		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
}

async function setSuperheroDetails(req, res, next) {
	try {
		const { body } = req;
		const dataStructure = {
			name: body.name,
			powerstats: {
				intelligence: body.intelligence,
				strength: body.strength,
				speed: body.speed,
				durability: body.durability,
				power: body.power,
				combat: body.combat,
			},
			biography: {
				'full-name': body.fullName,
				'alter-egos': body.alterEgo,
				aliases: body.aliases,
				'place-of-birth': body.placeOfBirth,
				'first-appearance': body.firstAppearance,
				publisher: body.publisher,
				alignment: body.alignment,
			},
			appearance: {
				gender: body.gender,
				race: body.race,
				height: [body.heightFt, body.heightCm],
				weight: [body.weightLb, body.weightKg],
				'eye-color': body.eyeColor,
				'hair-color': body.hairColor,
			},
			work: {
				occupation: body.occupation,
				base: body.base,
			},
			connections: {
				'group-affiliation': body.groupAffiliation,
				relatives: body.relatives,
			},
			image: {
				url: body.imageUrl,
			},
		};
		const update = await Superhero.findOneAndUpdate(
			{ id: body.id },
			{ ...dataStructure }
		);
		res.json(update);
	} catch (error) {
		next(error);
	}
}

async function getRecommendations(req, res, next) {
	try {
		const heroes = await SuperheroRecommendation.recommendations(
			'good',
			req.user._id
		);
		const villians = await SuperheroRecommendation.recommendations(
			'bad',
			req.user._id
		);
		const neutrals = await SuperheroRecommendation.recommendations(
			'neutral',
			req.user._id
		);

		let combinedArray = [...heroes, ...villians, ...neutrals];

		// shuffling the heroes
		combinedArray.sort(() => Math.random() - 0.5);

		combinedArray = combinedArray.slice(0, 8);

		res.json(combinedArray);
	} catch (error) {
		next(error);
	}
}

exports.superheroApi = {
	getSuperheroes,
	getSuperheroDetails,
	getRecommendations,
	setSuperheroDetails,
};
