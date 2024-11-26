import { z } from "zod";


export const loginValidationSchema = z.object({
    body: z.object({
        email: z
        .string({ required_error: 'email is required' })
        .email({ message: 'Invalid email address' })
        // eslint-disable-next-line no-useless-escape
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
          message: 'Invalid email format',
        }),
        password: z.string({required_error:'password is required!'})
    })
})