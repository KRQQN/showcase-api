import { z } from 'zod';

export const userCredentialsSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
  });
  
  export type UserType = z.infer<typeof userCredentialsSchema>;