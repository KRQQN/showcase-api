import { Request, Response, RequestHandler, Router } from 'express';
import { userCredentialsSchema } from '../zod/schemas';
import bcrypt from 'bcrypt';
import {
  InternalServerErrorException,
  UnauthorizedException,
  UserInputException
} from '../utils/customErrors';

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
    else return res.status(201).json({ message: 'User created' });
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
    return res.status(200).json({ message: 'Login successful' });
  }) as RequestHandler);
