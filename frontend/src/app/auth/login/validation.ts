import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Введите e-mail')
    .email('Введите корректный e-mail'),
  password: z
    .string()
    .min(6, 'Минимальная длина пароля — 6 символов'),
  remember: z.boolean().default(true),
});

export type LoginFormValues = z.infer<typeof loginSchema>;


