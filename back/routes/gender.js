import { Router } from 'express';
import auth from '../middleware/auth';

import { retriveGenders, setGender } from '../models/gender';

const genderRouter = Router();

genderRouter.get('/', auth, async (req, res) => {
	const Genders = await retriveGenders();
	res.json(Genders);
})

genderRouter.post('/', auth, async (req, res) => {
	const gender = req.body.gender_id;
	await setGender(req.user, gender);
	res.status(200).send();
})

export default genderRouter;