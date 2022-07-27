import { NextFunction, Request, Response } from 'express'
import AuthService from '../services/Auth'

const authService = new AuthService()

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await authService.login(email, password)
        if(user){
            const token = authService.createToken(user)
            res.json({ 
                'token': token,
                'user': user 
            })
        }else{
            throw new Error('Unable to Login: wrong credentials')
        }

    } catch (err) {
        next(err)
    }
}


export {
    login
}