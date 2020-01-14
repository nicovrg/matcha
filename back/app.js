import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import cors from 'cors';

import 'dotenv/config';

import { logErrors, clientErrorHandler, errorHandler } from './middleware/errors';

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.use('/user', /* LOL */);

module.exports = app;