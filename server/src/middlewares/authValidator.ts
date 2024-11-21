import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '../utils/customErrors';

const { JWT_SECRET } = process.env;

export async function authValidator(req: Request, res: Response, next: NextFunction) {
  const { bearer } = req.cookies
  if (!bearer) throw new UnauthorizedException('No token provided');

  const token = bearer.replace('Bearer', '').trim();

  const decoded = jwt.verify(token, JWT_SECRET!);
  req.user = decoded;
  next();

}