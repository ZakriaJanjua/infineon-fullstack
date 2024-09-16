const { default: mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
	email: String,
	password: String,
	role: {
		type: String,
		enum: ['ADMIN', 'USER'],
		default: 'USER',
	},
});

exports.User = mongoose.model('User', userSchema);
