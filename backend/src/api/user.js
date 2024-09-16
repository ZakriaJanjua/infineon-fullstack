async function getUser(req, res, next) {
	try {
		res.json(req.user);
	} catch (error) {
		next(error);
	}
}

exports.userApi = { getUser };
