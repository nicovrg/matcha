import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import 'dotenv/config';

import { handleError } from './middleware/errors';
import { chat, notifications } from './middleware/socket';

import userRouter from './routes/user';
import genderRouter from './routes/gender';
import hobbyRouter from './routes/hobby';
import chatRouter from './routes/chat';
import orientationRouter from './routes/orientation';
import { generateGenders, generateHobbies, generateOrientations } from './models/utils';
import notificationRouter from './routes/notification';

var app = express();

chat;
notifications;

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('etag');

generateGenders();
generateHobbies();
generateOrientations();

app.use('/user', userRouter);
app.use('/gender', genderRouter);
app.use('/orientation', orientationRouter);
app.use('/hobby', hobbyRouter);
app.use('/chat', chatRouter);
app.use('/notifications', notificationRouter);

app.use(handleError)

app.listen(3000, () => {
	console.log("I'm staying alive !");
});