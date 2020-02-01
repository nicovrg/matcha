import { Router } from 'express';
import auth from '../middleware/auth';

import { retriveGenders } from '../models/gender';

const genderRouter = Router();

genderRouter.get('/', auth, async (req, res) => {
	const Genders = await retriveGenders();
	res.json(Genders);
})

export default genderRouter;