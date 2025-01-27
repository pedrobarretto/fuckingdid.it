import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email é obrigatório' })
    .min(1, { message: 'Email é obrigatório' })
    .refine(
      (email) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        ),
      { message: 'Email inválido' }
    ),
  password: z
    .string({ required_error: 'Senha é obrigatório' })
    .min(1, { message: 'Senha é obrigatório' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
