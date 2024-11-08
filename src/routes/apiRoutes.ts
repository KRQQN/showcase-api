import { Router } from 'express';
import { crudFactory } from '../utils/crudFactory';
import provideRepository from '../middlewares/repositoryProvider';
import User from '../db/sequelize/models/user';
import { loginRegisterRouter } from './loginRegisterRoutes';

const apiRouter = Router()
.use('/users', provideRepository(User), crudFactory())
.use('/auth',  provideRepository(User), loginRegisterRouter)

export default apiRouter;
