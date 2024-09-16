const jwt = require('jsonwebtoken');

function checkTokenSetUser(req, res, next) {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		next();
	}
	const token = authHeader.split(' ')[1];
	if (!token) {
		next();
	}
	jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
		if (err) {
			console.error(err.message);
		}
		req.user = user;
		next();
	});
}

const isLoggedIn = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		const error = new Error('Un-Authorized access');
		res.status(401);
		next(error);
	}
};

const isAdmin = (req, res, next) => {
	if (req.user.role === 'ADMIN') {
		next();
	} else {
		const error = new Error('Un-Authorized access');
		res.status(403);
		next(error);
	}
};

exports.authMiddleware = {
	checkTokenSetUser,
	isLoggedIn,
	isAdmin,
};
