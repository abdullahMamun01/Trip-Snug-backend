import { z } from 'zod';
import { USER_ROLE } from './user.constants';

const userSchmea = z.object({
  firstName: z.string({ required_error: 'First Name is required' }),
  lastName: z.string({ required_error: 'Last Name is required' }),

  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' })
    // eslint-disable-next-line no-useless-escape
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
      message: 'Invalid email format',
    }),
  password: z.string({ required_error: 'Password is required!' }),
  role: z.enum(['user', 'admin']).default('user'),
  city: z.string({ required_error: 'City is required' }).optional(), // Optional field
  country: z.string({ required_error: 'Country is required' }).optional(), // Optional field

  location: z
    .object({
      lat: z.number({ required_error: 'Latitude is required' }),
      lng: z.number({ required_error: 'Longitude is required' }),
    })
    .optional(), // Optional field for geolocation

  dateOfBirth: z
    .string()
    .refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime()); // Check if valid date
      },
      { message: 'Invalid date format. Use a valid ISO date string.' },
    )
    .optional(), // Optional field
  phone: z
    .string()
    .regex(
      /^(?:\+?[1-9]{1,4}[.\- ]?)?(?:\(?\d{1,4}\)?[.\- ]?)?[\d.\- ]{3,15}$/,
      { message: 'Invalid phone number format' },
    )
    .optional(),
    gender: z.enum(['male', 'female', 'other']).optional()
});

const userRegisterValidationSchema = z.object({
  body: userSchmea,
});

export const updateUserValidateSchema = z.object({
  body: userSchmea.partial().strict(),
});

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
