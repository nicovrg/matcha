import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
	let token = req.headers['x-access-token'] || req.headers['authorization'];
	if (token.startsWith('Bearer ')) { token = token.slice(7, token.length); }
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				return res.json({
					success: false,
					message: 'Access denied'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.json({
			success: false,
			message: 'Auth token is not supplied'
		});
	}
  };

  export default checkToken;