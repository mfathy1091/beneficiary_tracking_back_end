import { NextFunction, Request, Response } from 'express'
import AuthService from '../services/authService'
import {BaseUser} from '../models/User'
const authService = new AuthService()
import { validationResult } from 'express-validator/check'

const register = async (req: Request, res: Response, next: NextFunction) => {
    // (1) Validate request parameters, queries using express-validator
    const { username, password } = req.body

    
    const user: BaseUser = {
        username: req.body.username,
        password: req.body.password,
        role_id: Number(req.body.role_id),
    }

    try {
        // (2) register new user
        const newUser = await authService.register(user)

        // (3) Create token
        let token = authService.generateToken(newUser);

        // (4) Create employee
        // const employee = await employeeModel.create({ name: params.name, email: params.email, user_id: Number(newUser.id) })

        // (4) Send confirmation email

        //authService.register(username, plainTextPassword);
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
    // (1) Validate request parameters, queries using express-validator
    const { username, password } = req.body;
    try {
        // (2) Check if authenticated
        const user = await authService.authenticate(username, password)
        if(user === null){
            res.status(404).json({error: 'Wrong credentials'})
        }else{
            const { password, ...userWithoutPassword } = user;
            // (3) Create token
            const token = authService.generateToken(user);

            res.json({ 
                'user': userWithoutPassword,
                'token': token
            });
        }
    } catch (err) {
        next(err)
    }
}


export {
    register,
    login
}