const _ = require('lodash');
const { Team } = require('../models/Team');

const WEIGHTS = {
	intelligence: 0.1,
	strength: 0.2,
	speed: 0.15,
	durability: 0.15,
	power: 0.2,
	combat: 0.2,
};

async function bouts(yourTeam, users) {
	try {
		const yourTeamPower = aggregatePower(yourTeam);
		let result = [];

		for (let user of users) {
			const userTeam = await Team.find({ user: user._id }).populate(
				'superhero'
			);
			const userTeamPower = aggregatePower(userTeam);
			if (yourTeamPower > userTeamPower) {
				result.push({
					boutResult: 'winner',
					powerDiff: yourTeamPower - userTeamPower,
					userTeam,
					userEmail: user.email,
				});
			} else if (userTeamPower > yourTeamPower) {
				result.push({
					boutResult: 'loser',
					powerDiff: userTeamPower - yourTeamPower,
					userTeam,
					userEmail: user.email,
				});
			} else {
				result.push({
					boutResult: 'tie',
					powerDiff: 0,
					userTeam,
					userEmail: user.email,
				});
			}
		}
		return result;
	} catch (error) {
		throw error;
	}
}

function aggregatePower(team) {
	const teamScoresArr = team.map((hero) =>
		Object.entries(hero.superhero.powerstats).reduce((total, [stat, value]) => {
			return total + parseInt(value) * WEIGHTS[stat];
		}, 0)
	);
	const total = _.sum(teamScoresArr);
	return total;
}

exports.teamBouts = { bouts };
