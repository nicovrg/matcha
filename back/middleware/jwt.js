import expressJwt from 'express-jwt';

let jwt = () => {
	const {secret} = process.env.JWT_SECRET; 
	return expressJwt({ secret }).unless({
		path: [
			'/users/authenticate'
		]
	});
}