import { z } from 'zod';
import { signInSchema, signUpSchema } from './schema';

export type SignInFormData = z.infer<typeof signInSchema>;

export type SignUpFormData = z.infer<typeof signUpSchema>;

export type MovieData = {
  id: string;
  title: string;
  year: number;
  image: string;
  description: string;
};
