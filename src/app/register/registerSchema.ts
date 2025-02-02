import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string({ required_error: 'Email is mandatory' })
    .min(1, { message: 'Email is mandatory' })
    .refine(
      (email) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        ),
      { message: 'Invalid email' }
    ),
  // password: z
  //   .string({ required_error: 'Password is mandatory' })
  //   .min(1, { message: 'Password is mandatory' }),
  username: z
    .string({ required_error: 'Name is mandatory' })
    .min(1, { message: 'Name is mandatory' }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
