import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import cors from 'cors';

import 'dotenv/config';

import { logErrors, clientErrorHandler, errorHandler } from './middleware/errors';

import userRouter from './routes/user';

import genderRouter from './routes/gender';

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);
app.use('/gender', genderRouter);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

module.exports = app;