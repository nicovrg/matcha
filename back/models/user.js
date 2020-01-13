import Model from './model';

import uuidv1 from 'uuid/v1';

class User extends Model {
	constructor (user) {
		this.Schema = {
			register: {
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
				}
			},
			login: {
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
				}
			},
			errorMsg: "Invalid User"
		}

		this.content = {
			_id: user._id ? user._id : uuidv1(),
			username: user.username,
			email: user.email,
			password: user.password
		}
	}	 
}

export default User;



