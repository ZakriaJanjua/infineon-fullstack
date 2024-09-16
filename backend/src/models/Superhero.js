const { default: mongoose } = require('mongoose');

const superheroSchema = new mongoose.Schema({
	id: String,
	name: String,
	powerstats: {
		intelligence: String,
		strength: String,
		speed: String,
		durability: String,
		power: String,
		combat: String,
	},
	biography: {
		'full-name': String,
		'alter-egos': String,
		aliases: [String],
		'place-of-birth': String,
		'first-appearance': String,
		publisher: String,
		alignment: String,
	},
	appearance: {
		gender: String,
		race: String,
		height: [String],
		weight: [String],
		'eye-color': String,
		'hair-color': String,
	},
	work: {
		occupation: String,
		base: String,
	},
	connections: {
		'group-affiliation': String,
		relatives: String,
	},
	image: {
		url: String,
	},
});

exports.Superhero = mongoose.model('Superhero', superheroSchema);
