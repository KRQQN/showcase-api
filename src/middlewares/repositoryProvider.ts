import { Request, Response, NextFunction } from 'express';
import { Model } from 'sequelize-typescript';

export default function provideRepository<T extends Model>(model: new () => T) {
  return (req: Request, res: Response, next: NextFunction) => {
    
    if(req.sequelize) {
        req.repository = req.sequelize.getRepository(model)
    }

    next();
  };
}
