import { Request } from 'express';
import { Repository, Sequelize } from 'sequelize-typescript';
import { JwtPayload } from 'jsonwebtoken';
import User from './src/db/sequelize/models/'; 

declare global {
  namespace Express {
    interface Request {
      repository: Repository<any>;
      user?: string | JwtPayload;
    }
  }
}