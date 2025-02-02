import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Please, provide your login email' })
    .min(1, { message: 'Please, provide your login email' })
    .refine(
      (email) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        ),
      { message: 'Invalid email' }
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
