import { z } from 'zod';

const PASSWORD_MIN_LENGTH = 6;
const PHONE_LENGTH = 11;

export const userSchema = z.object({
  email: z.string().min(1, 'Обязательное поле'),
  password: z
    .string()
    .min(
      PASSWORD_MIN_LENGTH,
      `Пароль должен быть не меньше ${PASSWORD_MIN_LENGTH} символов`,
    )
    .min(1, 'Обязательное поле'),
});

export const statusUnion = z.union([
  z.literal('active'),
  z.literal('completed'),
  z.literal('in_progress'),
  z.literal('rejected'),
]);

export const applicationSchema = z.object({
  name: z.string().min(1, 'Обязательное поле'),
  phone: z
    .string()
    .min(PHONE_LENGTH, 'Неправильный номер телефона')
    .min(1, 'Обязательное поле'),
  amount: z.number().min(1, 'Обязательное поле'),
  status: statusUnion,
});
