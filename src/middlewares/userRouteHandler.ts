import { Request, Response, NextFunction } from 'express';
import { userCredentialsSchema } from '../zod/schemas';
import bcrypt from 'bcrypt';

export async function userRouteHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === 'POST') {
    const pareseRes = userCredentialsSchema.safeParse(req.body);
    
    if (pareseRes.success) {
      const pw = pareseRes.data.password
      const hashedPassword = await bcrypt.hash(pw, 10);
      req.body = { ...pareseRes.data, password: hashedPassword };
      return next();
    }
    res.status(400).json({ message: pareseRes.error })
  } else {
    next();
  }
}
