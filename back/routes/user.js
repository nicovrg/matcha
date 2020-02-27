import { Router } from 'express';
import fs from 'fs';

import auth from '../middleware/auth';
import upload from '../middleware/pictures';

import { userExists, registerUser, findByCreditentials, generateAuthToken, logoutUser, logoutAll, editUser, savePicture, getPictures, verifyPicture, deletePicture, setLocation, getLocation, getToken, getPopularityScore, setAsProfilePicture, getByOrientation, hasExtendedProfile, match, sortByParams } from '../models/user';
import { getGender, setGender, verifyGender} from '../models/gender';
import { getHobbies, setHobbies, verifyHobbies, userHasHooby, unsetHobby} from '../models/hobby';
import { ErrorHandler } from '../middleware/errors';
import { isEmpty, isEighteen } from '../models/utils';
import { getOrientation, verifyOrientation, setOrientation } from '../models/orientation';

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
		user.popularity = await getPopularityScore(user);
		const location = await getLocation(user);
		if (location) user.location = location;
		let token = await getToken(user);
		if (!token) token = await generateAuthToken(user);
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
			birthdate: req.body.birthdate ? req.body.birthdate : null,
			proximity: req.body.proximity ? req.body.proximity : null,
		}
		if (isEmpty(user)) throw new ErrorHandler(400, "Missing at least one field");
		if (user.birthdate)
			if (!user.birthdate.match(/(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/g))
				throw new ErrorHandler(400, 'Date should be in format YYYY-MM-DD');
			else if ( !isEighteen(user.birthdate))
				throw new ErrorHandler(400, 'You should be 18 Years Old to register');
		user._id = req.user._id;
		const editedUser = await editUser(user);
		return res.status(200).json({user: editedUser});
	} catch (err) {
		next(err);
	}
})

userRouter.get('/me', auth, async (req, res) => {
		const location = await getLocation(req.user);
		req.user.popularity = await getPopularityScore(req.user);
		if (location) req.user.location = location;
		res.status(200).json(req.user);
})

userRouter.get('/gender', auth, async (req, res) => {
	const gender = await getGender(req.user);
	if (gender)
		return res.status(200).json(gender);
	else
		return res.status(200).send();
})

userRouter.get('/orientation', auth, async (req, res) => {
	const orientation = await getOrientation(req.user);
	if (orientation)
		return res.status(200).json(orientation);
	else
		return res.status(200).send();
})

userRouter.post('/gender', auth, async (req, res, next) => {
	try {
		const gender = req.body._id;
		if (!gender || !await verifyGender(gender)) throw new ErrorHandler(400, "Invalid required field");
		const actualGender = await getGender(req.user);
		if (actualGender._id != gender) await setGender(req.user, gender);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.post('/orientation', auth, async (req, res, next) => {
	try {
		const orientation = req.body._id;
		if (!orientation || !await verifyOrientation(orientation)) throw new ErrorHandler(400, "Invalid required field");
		const actualOrientation = await getOrientation(req.user);
		if (actualOrientation._id != orientation) await setOrientation(req.user, orientation);
		res.status(200).send();
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
		if (!hobbies.length || !await verifyHobbies(hobbies)) throw new ErrorHandler(400, "Invalid required field");
		
		await setHobbies(req.user, hobbies);
		return res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.delete('/hobby', auth, async (req, res, next) => {
	try {
		const hobby_id = req.body._id;
		if (!hobby_id || !await verifyHobbies([hobby_id]) || !await userHasHooby(req.user, hobby_id)) throw new ErrorHandler(400, "Invalid required field");
		
		await unsetHobby(req.user, hobby_id);
		res.status(200).send();
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

userRouter.post('/picture', [auth, upload.single('picture')], async (req, res, next) => {
	try {
		if(!req.file) throw new ErrorHandler(400, "Invalid required field");
		const dbPictures = await getPictures(req.user);
		if (dbPictures && dbPictures.length >= 5) {
			fs.unlinkSync(`./public/images/${req.file.filename}`);
			throw new ErrorHandler(400, "You can't upload more than 5 pictures");
		}
		const url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
		const picture = await savePicture(req.user, url, req.file.filename);

		res.status(200).json(picture);
	} catch (err) {
		next(err);
	}
})

userRouter.get('/picture', auth, async (req, res, next) => {
	try {
		const pictures = await getPictures(req.user);
		res.status(200).json(pictures);
	} catch (err) {
		next(err);
	}
})

userRouter.delete('/picture', auth, async (req, res, next) => {
	try {
		const picture_id = req.body._id;
		if (!picture_id) throw new ErrorHandler(400, "Invalid required field");
		
		const picture_name = await verifyPicture(req.user, picture_id)
		if (!picture_name) throw new ErrorHandler(400, "Invalid picture id");

		fs.unlinkSync(`./public/images/${picture_name}`);
		await deletePicture(picture_id);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.post('/profile', auth, async (req, res, next) => {
	try {
		const { _id } = req.body;
		if (!_id) throw new ErrorHandler(400, 'Missing required field');
		if (!await setAsProfilePicture(req.user, _id)) throw new ErrorHandler(400, 'This picture does not exist');
		res.status(204).send();
	} catch(err) {
		next(err);
	}
})

userRouter.post('/location', auth, async (req, res, next) => {
	try {
		const {lat, lng} = req.body;
		if (!lat || !lng) throw new ErrorHandler(400, "Invalid required field");
		
		const location = {lat, lng};
		const newLocation = await setLocation(req.user, location);
		res.status(200).json(newLocation);
	} catch (err) {
		next(err);
	}
})

userRouter.get('/search', auth, async (req, res, next) => {
	try {
		if (!hasExtendedProfile(req.user)) throw new ErrorHandler(403, 'Please fill your extended profile');
		const {age, popularity, distance, hobbies } = req.body;
		const filters = { age, popularity, distance, hobbies };
		if (isEmpty(filters)) throw new ErrorHandler(400, 'You need at least one parameter');
		const users = sortByParams(req.user, await getByOrientation(req.user), filters);
		res.status(200).json(users);
	} catch (err) {
		next(err);
	}
})

userRouter.get('/match', auth, async (req, res, next) => {
	try {
		if (!hasExtendedProfile(req.user)) throw new ErrorHandler(403, 'Please fill your extended profile');
		const users = await match(req.user);
		res.status(200).json(users);
	} catch (err) {
		next(err);
	}
})

export default userRouter;