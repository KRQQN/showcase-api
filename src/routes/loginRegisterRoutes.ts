import { Request, Response, RequestHandler, Router } from 'express';
import { userCredentialsSchema } from '../zod/schemas';
import bcrypt from 'bcrypt';

export async function registerHandler(req: Request, res: Response) {
  const pareseRes = userCredentialsSchema.safeParse(req.body);

  if (pareseRes.success) {
    const pw = pareseRes.data.password;
    const hashedPassword = await bcrypt.hash(pw, 10);
    const userCredentials = { ...pareseRes.data, password: hashedPassword };
    const user = await req.repository.create(userCredentials);

    if (user) res.status(201).json({ message: 'User created' });
    else throw new ServerError('Failed to create user');
  } else res.status(400).json({ message: pareseRes.error });
}

export async function loginHandler(req: Request, res: Response) {
  const pareseRes = userCredentialsSchema.safeParse(req.body);

  if (pareseRes.success) {
    const userCredentials = pareseRes.data;

    const user = await req.repository.findOne({where: { email: userCredentials.email }});
    const match = await bcrypt.compare(userCredentials.password, user.password);

    if (user && match) res.status(200).json({ message: 'Login successful' });
    else res.status(401).json({ message: 'Email or password not correct' });
  } else res.status(400).json({ message: pareseRes.error });
}

export const loginRegisterRouter = Router()
  .post('/register', registerHandler)
  .post('/login', loginHandler);
