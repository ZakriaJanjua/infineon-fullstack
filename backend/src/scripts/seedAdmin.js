const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const { User } = require('../models/User');
require('dotenv').config();

async function seedAdmin() {
	try {
		const password = '123123123';
		const hashedPassword = await bcrypt.hash(password, 12);
		const admin = await User.create({
			email: 'admin@gmail.com',
			password: hashedPassword,
			role: 'ADMIN',
		});
		console.log('admin created', admin);
	} catch (error) {
		console.error(error);
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
	.then(async () => await seedAdmin())
	.catch((err) => console.error(err))
	.finally(() => process.exit());
