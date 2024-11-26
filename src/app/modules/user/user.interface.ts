import { USER_ROLE } from "./user.constants"

export type TUser = {
    userId?: string,
    firstName: string ,
    lastName: string ,
    email: string ,
    password:string ,
    phone?: string ,
    isOAuthUser?: boolean ,
    role: 'user' | 'admin',
    oauthProvider?: string
    address: string ,
    image?: string 
}

export type TLogin = {
    email: string,
    password: string
}

export type TUserRole  = keyof typeof USER_ROLE
