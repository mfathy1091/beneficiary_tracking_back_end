import {Request, Response, NextFunction} from 'express'
import TokenService from '../services/tokenService'

const tokenService = new TokenService;

const AuthMiddleware = (req: Request, res: Response, next:NextFunction) => {
    try {
        const { authorization: authorizationHeader } = req.headers
        if(!authorizationHeader) {
            return res.status(401).send('Not Authorized')
        }
        const token = authorizationHeader.split(' ')[1]
        const decoded = tokenService.verifyToken(token)

        next() // No error proceed to next middleware
    } catch (err) {
        return res.status(401).send('Not Authorized')
    }
}




export default AuthMiddleware