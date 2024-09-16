const { default: mongoose } = require('mongoose');

const teamSchema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	superhero: {
		type: mongoose.Types.ObjectId,
		ref: 'Superhero',
		required: true,
	},
});

teamSchema.statics.checkTeamLimit = async function (user) {
	const count = await this.countDocuments({ user });
	if (count >= 8) {
		throw new Error('User cannot have more than 8 superheroes in their team.');
	}
};

teamSchema.statics.checkSuperhero = async function (superhero) {
	const teamMember = await this.findOne({ superhero });
	if (teamMember) {
		throw new Error('This superhero is already present in the team.');
	}
};

teamSchema.pre('save', async function (next) {
	if (this.isNew) {
		try {
			await this.constructor.checkTeamLimit(this.user);
			await this.constructor.checkSuperhero(this.superhero);
			next();
		} catch (error) {
			next(error);
		}
	} else {
		next();
	}
});

exports.Team = mongoose.model('Team', teamSchema);
