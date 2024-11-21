import { Request, Response, RequestHandler, Router } from 'express';
import { userCredentialsSchema } from '../zod/schemas';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  InternalServerErrorException,
  UnauthorizedException,
  UserInputException
} from '../utils/customErrors';

const { JWT_SECRET, NODE_ENV } = process.env;

export const loginRegisterRouter = Router()
  .post('/register', (async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {

    const pareseRes = userCredentialsSchema.safeParse(req.body);
    if (!pareseRes.success) throw new UserInputException();

    const pw = pareseRes.data.password;
    const hashedPassword = await bcrypt.hash(pw, 10);
    const userCredentials = { ...pareseRes.data, passwordHash: hashedPassword };
    const user = await req.repository.create(userCredentials);

    if (!user) throw new InternalServerErrorException('Something went wrong creating user');

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET!, { expiresIn: '1h' });
    
    return res
      .cookie('auth_token', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
      })
      .status(201)
      .redirect('/welcome');
    
  }) as RequestHandler)

  .post('/login', (async (req: Request, res: Response): Promise<Response | void> => {

    const pareseRes = userCredentialsSchema.safeParse(req.body)
    if (!pareseRes.success) throw new UserInputException();

    const userCredentials = pareseRes.data;
    const user = await req.repository.findOne({
      where: { email: userCredentials.email }
    });
    const match = await bcrypt.compare(userCredentials.password, user.passwordHash);

    if (!user || !match) throw new UnauthorizedException();
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET!, { expiresIn: '1h' });
  
    return res
      .cookie('bearer', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
      })
      .status(200)
      .redirect('/')
  }) as RequestHandler);
