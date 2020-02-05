import { Router } from 'express';
import auth from '../middleware/auth';

import { userExists, registerUser, findByCreditentials, generateAuthToken, logoutUser, logoutAll, editUser } from '../models/user';
import { getGender, setGender, verifyGender} from '../models/gender';
import { getHobbies, setHobbies, verifyHobbies} from '../models/hobby';
import { ErrorHandler } from '../middleware/errors';
import { isEmpty } from '../models/utils';

const userRouter = Router();

userRouter.post('/register', async (req, res, next) => {
	try {
		const user = {
			email: req.body.email,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			username: req.body.username,
			password: req.body.password
		}
		if (!user.email || !user.username || !user.password || !user.firstname || !user.lastname) throw new ErrorHandler(400, 'Missing required fields');
		if (await userExists(user)) throw new ErrorHandler(400, 'User already exists');
		registerUser(user);
		res.status(200).json({});
	} catch (err) {
		next(err);
	}
});

userRouter.post('/login', async (req, res, next) => {
	try {
		const {email, password} = req.body;
		if (!email || !password) throw new ErrorHandler(400, 'Missing required fields');
		const user = await findByCreditentials(email, password);
		if (!user) throw new ErrorHandler(401, 'Login failed! Check authentication credentials');
		const token = await generateAuthToken(user);
		return res.status(200).json({user, token});
	} catch (err) {
		next(err);
	}
});

userRouter.post('/edit', auth, async (req, res, next) => {
	try {
		const user = {
			email: req.body.email ? req.body.email : null,
			firstname: req.body.firstname ? req.body.firstname : null,
			lastname: req.body.lastname ? req.body.lastname : null,
			username: req.body.username ? req.body.username : null,
			biography: req.body.biography ? req.body.biography : null,
			age: req.body.age ? req.body.age : null
		}
		if (isEmpty(user)) throw new ErrorHandler(400, "Missing at least one field");
		
		user._id = req.user._id;
		const editedUser = await editUser(user);
		return res.status(200).json({user: editedUser});
	} catch (err) {
		next(err);
	}
})

userRouter.get('/me', auth, async (req, res) => {
		res.status(200).json(req.user);
})

userRouter.get('/gender', auth, async (req, res) => {
	const gender = await getGender(req.user);
	if (gender)
		return res.status(200).json(gender);
	else
		return res.status(200).send();
})

userRouter.post('/gender', auth, async (req, res, next) => {
	try {
		const gender = req.body.gender_id;
		if (!gender || !await verifyGender(gender)) throw new ErrorHandler(400, "Invalid required field");
		const actualGender = await getGender(req.user);
		if (actualGender._id != gender) await setGender(req.user, gender);
		return res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.get('/hobby', auth, async (req, res) => {
	const hobbies = await getHobbies(req.user);
	if (hobbies)
		return res.status(200).json(hobbies);
	else
		return res.status(200).send();
})

userRouter.post('/hobby', auth, async (req, res, next) => {
	try {
		const hobbies = req.body.hobbies;
		console.log(hobbies.length)
		console.log(await verifyHobbies(hobbies));
		if (!hobbies.length || !await verifyHobbies(hobbies)) throw new ErrorHandler(400, "Invalid required field");
		await setHobbies(req.user, hobbies);
		return res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.post('/logout', auth, async (req, res) => {
	await logoutUser(req.token);
	res.status(200).json({success: true});
})

userRouter.post('/logout/all', auth, async (req, res) => {
	await logoutAll(req.user);
	res.status(200).json({success: true});
})

export default userRouter;