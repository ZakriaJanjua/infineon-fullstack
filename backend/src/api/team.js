const { Team } = require('../models/Team');
const { User } = require('../models/User');
const { teamBouts } = require('../utils/teamBouts');

async function addTeamMember(req, res, next) {
	try {
		const { superheroId } = req.body;
		const teamMember = await Team.create({
			user: req.user._id,
			superhero: superheroId,
		});
		res.json(teamMember);
	} catch (error) {
		next(error);
	}
}

async function deleteTeamMember(req, res, next) {
	try {
		const { superheroId } = req.query;
		const deletedMember = await Team.findOneAndDelete({
			superhero: superheroId,
		});
		res.json(deletedMember);
	} catch (error) {
		next(error);
	}
}

async function getTeam(req, res, next) {
	try {
		const team = await Team.find({ user: req.user._id }).populate('superhero');
		res.json(team);
	} catch (error) {
		next(error);
	}
}

async function getTeamIds(req, res, next) {
	try {
		const team = await Team.find({ user: req.user._id }).populate('superhero');
		const teamIds = team.map((member) => String(member.superhero._id));
		res.json(teamIds);
	} catch (error) {
		next(error);
	}
}

async function runBouts(req, res, next) {
	try {
		const users = await User.find({ _id: { $ne: req.user._id } });
		const yourTeam = await Team.find({ user: req.user._id }).populate(
			'superhero'
		);
		const results = await teamBouts.bouts(yourTeam, users);
		res.json(results);
	} catch (error) {
		next(error);
	}
}

exports.teamApi = {
	addTeamMember,
	getTeam,
	getTeamIds,
	deleteTeamMember,
	runBouts,
};
