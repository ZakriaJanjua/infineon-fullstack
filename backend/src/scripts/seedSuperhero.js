const { default: axios } = require('axios');
const { Superhero } = require('../models/Superhero');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

async function seedSuperhero() {
	try {
		for (let i = 501; i <= 731; i++) {
			const { data } = await axios.get(
				`https://superheroapi.com/api/${process.env.API_KEY}/${i}`
			);
			await Superhero.create({ ...data });
			console.log('added', i);
		}
	} catch (err) {
		console.error(err);
	}
}

const dbConnection = new Promise((resolve, reject) => {
	mongoose.connect(process.env.MONGO_CONNECTION).then(
		() => {
			console.log('db connected');
			resolve();
		},
		(err) => {
			console.error(err);
			reject();
		}
	);
});

dbConnection
	.then(async () => await seedSuperhero())
	.catch((err) => console.error(err))
	.finally(() => process.exit());
