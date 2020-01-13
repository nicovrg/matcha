import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import models from '../models';

import validate from '../middleware/validation';

const router = Router();

router.post('/register', async (req, res) => {
	let user = new models.User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	})

	const { error } = validate(user.Schema.register, user.content);
	if (error) return res.status(400).send(error.message);

	// TODO: Check is user exist in DB & throw error if he exist

	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	user.content.password = hashPassword;



	// TODO: Save user in DB
});

router.post('/login', async (req, res) => {
	let user = new models.User({
		email: req.body.username,
		password: req.body.password
	})

	const { error } = validate(user.Schema.login, user.content);
	if (error) return res.status(400).send(error.message);

	// TODO: Get User from DB

	const knownUser = "Get user from DB";
	if (!knownUser) return res.status(400).send('Email or password is wrong');

	const validPassword = await bcrypt.compare(user.content.password, knownUser.password);
	if (!validPassword) return res.status(400).send('Email or password is wrong');

	const token = jwt.sign({_id: knownUser._id}, process.env.JWT_SECRET);
	res.header('x-access-token', token).send(token);
});

export default router;
