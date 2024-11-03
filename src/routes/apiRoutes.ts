import { Router } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { crudFactory } from '../utils/crudFactory';
import User from '../db/sequelize/models/user';


export function apiRoutes(sequelize: Sequelize) {
  const userRepository = sequelize.getRepository(User);
  return Router()
    .use('/users', crudFactory(userRepository))
}
