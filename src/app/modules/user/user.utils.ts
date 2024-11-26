import config from "../../config"
import { USER_ROLE } from "./user.constants"
import UserModel from "./user.model"
import bcrypt from 'bcrypt'

export const findUserByEmail = async (email:string) =>{
    return await UserModel.findOne({email}).select('+password -__v')
} 


export const hashedPassword =async (password:string ) => {
    const hashPass = await bcrypt.hash(password , Number(config.bcrypt_salt_rounds))
    return hashPass
}



export const isValidRole = (role: string): role is typeof USER_ROLE[keyof typeof USER_ROLE] => {
    return Object.values(USER_ROLE).includes(role as typeof USER_ROLE[keyof typeof USER_ROLE]);
  };