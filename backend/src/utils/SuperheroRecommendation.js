const { Superhero } = require('../models/Superhero');
const { Team } = require('../models/Team');
const _ = require('lodash');

async function recommendations(alignment, userId) {
	const sampleSize = await Superhero.aggregate([
		[
			{ $match: { 'biography.alignment': alignment } },
			{ $sample: { size: 100 } },
		],
	]);
	// removing the superheroes already present as team members.
	const team = await Team.find({ user: userId });
	const idSet = new Set(team.map((member) => member.superhero));
	const filteredSampleSize = sampleSize.filter(
		(sample) => !idSet.has(sample._id)
	);

	const recommendedMembers = [];
	const statPriorities = [
		'intelligence',
		'strength',
		'speed',
		'durability',
		'power',
		'combat',
	];

	// taking the hero with the best of each powerstat to make a balanced team.
	for (let i = 0; i < 6; i++) {
		const stat = statPriorities[i];

		const selectedHero = _.maxBy(filteredSampleSize, (hero) =>
			parseInt(hero.powerstats[stat])
		);

		recommendedMembers.push(selectedHero);
		_.pull(filteredSampleSize, selectedHero);
	}
	return recommendedMembers;
}

exports.SuperheroRecommendation = { recommendations };
