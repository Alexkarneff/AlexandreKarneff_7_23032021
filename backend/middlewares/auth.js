const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
		const userId = decodedToken.userId;
		console.log(token);
		// if (req.body.userId && req.body.userId !== userId) {
		if (req.body.userId !== userId) {
			console.log('auth', req.body.userId);
			console.log('auth', userId);
			throw 'User Id non valable !';
		} else {
			// si tout est ok, on peut passer la requête au prochain middleware
			next();
		}
	} catch (error) {
		// problème d'authentification
		res.status(401).json({ error, message: 'Requête non authentifiée' });
	}
};