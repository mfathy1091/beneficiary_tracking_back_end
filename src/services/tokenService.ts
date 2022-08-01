
import { BaseUser } from '../models/User';
import jwt from 'jsonwebtoken'


export default class TokenService {

    generateToken(user: BaseUser): string{
        const token = jwt.sign({user}, process.env.TOKEN_SECRET as unknown as string);
        return token;
    }

    verifyToken(token: string){
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET as unknown as string)
        } catch (error) {
            return error
        }    
    }


}

