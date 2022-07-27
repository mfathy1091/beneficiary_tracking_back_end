import {Request, Response, NextFunction} from 'express'
import AuthService from '../services/Auth'

const authService = new AuthService;

const AuthMiddleware = (req: Request, res: Response, next:NextFunction) => {
    try {
        const { authorization: authorizationHeader } = req.headers
        if(!authorizationHeader) {
            return res.status(401).send('Not Authorized')
        }
        const token = authorizationHeader.split(' ')[1]
        const decoded = authService.verifyToken(token)

        next() // No error proceed to next middleware
    } catch (err) {
        return res.status(401).send('Not Authorized')
    }
}




export default AuthMiddleware