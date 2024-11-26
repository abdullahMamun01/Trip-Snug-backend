
import { TUser } from "../modules/user/user.interface";



declare global {
    namespace Express {
        interface User extends TUser {}
        interface Request {
            user: TUser

        }
    }
}