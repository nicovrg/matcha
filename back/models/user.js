import Model from './model';
import uuidv1 from 'uuid/v1';
import bcrypt from 'bcryptjs';

import validate from '../middleware/validation';

const userModel = new Model({
	_id: {
		type: 'string',
		required: true
	},
	username: {
		type: 'string',
		minLength: 8,
		maxLength: 16,
		required: true
	},
	email: {
		type: 'string',
		lowercase: true,
		required: true
	},
	password: {
		type: 'string',
		minLength: 8,
		maxLength: 20,
		required: true
	},
	errorMsg: "Invalid User" 
});

userModel.methods.generateAuthToken = async (user) => {
	return jwt.sign({_id: user.id}, process.env.JWT_SECRET);
}

userModel.methods.register = async (session, user) => {
	user._id = uuidv1();
	//validate(userModel.shema, user);
	user.password = await bcrypt.hash(user.password, 8);

	const cypher = 'CREATE (u:User {_id: {_id}, username: {username}, email: {email}, password: {password}})';
	const params = user;

	session.run(cypher, params).then(res =>{
		console.log(res);
	})
	.catch(e => {
		throw new Error({ error: e });
	})
}

userModel.methods.findByCreditential= async (session, email, password) => {
	const cypher = 'MATCH (u:User {u.email} RETURN p)';
	const params = { email: email };

	session.run(cypher, params).then(res => {
		Console.log(result);
	}).catch(e => {
		console.log(e);
	})
}

export default userModel;



