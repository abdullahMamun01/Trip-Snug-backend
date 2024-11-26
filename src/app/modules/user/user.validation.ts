import { z } from 'zod';
import { USER_ROLE } from './user.constants';


const userSchmea =  z.object({
  name: z.string({ required_error: 'Name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' })
     // eslint-disable-next-line no-useless-escape
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
      message: 'Invalid email format',
    }),
  password: z.string({ required_error: 'Password is required!' }),
  phone: z
    .string({ required_error: 'phone number is required' })
    .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number format' }),
  role: z.enum(['user', 'admin']).default('user'),
  address: z.string({ required_error: 'Address is required' })
})

const userRegisterValidationSchema = z.object({
  body:userSchmea,
});



export const updateUserValidateSchema = z.object({
  body: userSchmea.partial().strict()
})

export const userRoleSchema = z.object({
  body: z.object({
    role: z.enum(
      Object.values(USER_ROLE) as [
        (typeof USER_ROLE)[keyof typeof USER_ROLE],
        ...(typeof USER_ROLE)[keyof typeof USER_ROLE][],
      ],
    ),
  }),
});

export default userRegisterValidationSchema;
