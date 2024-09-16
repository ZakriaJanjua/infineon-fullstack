const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const respond422 = (res, next) => {
	res.status(422);
	const error = new Error('Unable to Login');
	next(error);
};

function createTokenSendResponse(user, res, next) {
	const payload = {
		_id: user._id,
		email: user.email,
		role: user.role,
	};

	jwt.sign(
		payload,
		process.env.TOKEN_SECRET,
		{ expiresIn: '1h' },
		(err, token) => {
			if (err) {
				respond422(res, next);
			} else {
				res.json({ token });
			}
		}
	);
}

async function signUp(req, res, next) {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		// if user is already present
		if (user) {
			const error = new Error('User already present');
			res.status(409);
			next(error);
			return;
		}

		bcrypt.hash(password, 12).then((hashedPassword) => {
			const newUser = {
				email,
				password: hashedPassword,
			};
			User.create(newUser).then((insertedUser) => {
				createTokenSendResponse(insertedUser, res, next);
			});
		});
	} catch (error) {
		next(error);
	}
}

async function signIn(req, res, next) {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			respond422(res, next);
		}

		bcrypt.compare(password, user.password).then((result) => {
			if (result) {
				createTokenSendResponse(user, res, next);
			} else {
				respond422(res, next);
			}
		});
	} catch (error) {
		next(error);
	}
}

exports.authApi = { signUp, signIn };
