import { Request, Response, NextFunction } from 'express';
import { Model } from 'sequelize-typescript';
import sequelize from '../db/sequelize/sequelizeConnection';

export default function provideRepository<T extends Model>(model: new () => T) {
  return (req: Request, res: Response, next: NextFunction) => {
    req.repository = sequelize.getRepository(model)
    next();
  };
}


