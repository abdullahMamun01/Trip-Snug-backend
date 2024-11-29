
import { TUser } from "../modules/user/user.interface";



declare global {
    namespace Express {
        interface User extends TUser {
            userId?: string ,
            _id?: string
        }
        interface Request {
            user: TUser

        }
    }
}