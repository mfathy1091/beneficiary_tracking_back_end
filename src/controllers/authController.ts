import { NextFunction, Request, Response } from 'express'
import AuthService from '../services/authService'
import UserModel from '../models/User'
import { hashPassword } from '../utils/hashing'
import TokenService from '../services/tokenService'
const userModel = new UserModel()
const authService = new AuthService()
const tokenService = new TokenService()

const register = async (req: Request, res: Response, next: NextFunction) => {
    // (1) Validate request parameters, queries using express-validator
    const { username, plainTextPassword } = req.body


    // (2) Create user
    const newUser = await userModel.create({ username, password })

    // (3) Create token
    let token = tokenService.generateToken(newUser);

    // (4) Send confirmation email

    try {
        // let data = await authService.register({}, page, limit)
        authService.register(username, plainTextPassword);
        res.status(201)
        res.json({
            'message': 'Successfuly created!',
            'user': newUser,
            'token': token
        })

    } catch(err) {
        next(err)
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await authService.login(email, password)
        if(user){
            const token = tokenService.generateToken(user)
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
    register,
    login
}