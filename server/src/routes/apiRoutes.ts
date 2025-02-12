import { Router } from 'express';
import { crudFactory } from '../utils/crudFactory';
import { loginRegisterRouter } from './loginRegisterRoutes';
import provideRepository from '../middlewares/repositoryProvider';
import User from '../db/sequelize/models/user';
import WordleHighscore from '../db/sequelize/models/wordleHighscore';
import { wordleRouter } from './handleWordle';

const apiRouter = Router()
.use('/users', provideRepository(User), crudFactory())
.use('/profile', provideRepository(User), crudFactory())
.use('/auth',  provideRepository(User), loginRegisterRouter)
.use('/wordle', provideRepository(WordleHighscore), wordleRouter)

export default apiRouter;
