import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import cors from 'cors';

import 'dotenv/config';

import routes from './routes';

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', routes.user);

module.exports = app;