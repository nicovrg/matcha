import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import 'dotenv/config';

import { handleError} from './middleware/errors';

import { generateGenders } from './models/utils';

import userRouter from './routes/user';

import genderRouter from './routes/gender';

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

generateGenders();

app.use('/user', userRouter);
app.use('/gender', genderRouter);

app.use(handleError)

module.exports = app;