import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/User'
import { hashPassword } from '../utils/hashing'
import { BaseUser } from '../models/User'
import jwt from 'jsonwebtoken'


const userModel = new UserModel()

const index = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userModel.index()
        res.json(users)
    } catch (err) {
        next(err)
    }
}

const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.show(req.params.userId)
        res.json(user)
    } catch (err) {
        next(err)
    }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    const hashedPassword = await hashPassword(req.body.password)
    const user: BaseUser = {
        username: req.body.username,
        password: hashedPassword as string
    }
    try {
        const newUser = await userModel.create(user)
        let token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as unknown as string)
        res.status(201)
        res.json({
            'message': 'Successfuly created!',
            'user': user,
            'token': token
        })

    } catch(err) {
        next(err)
    }
}

const update = async (req: Request, res: Response, next:NextFunction) => {
    const user: Omit<BaseUser, "id"> = {
        username: req.body.username,
        password: req.body.password,
    }
    try {
        const newUser = await userModel.update(req.params.userId, user)
        res.json(newUser)
    } catch(err) {
        next(err)    
    }
}

const destroy = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const deletedUser = await userModel.delete(req.params.userId)
        res.json(deletedUser)
    } catch(err) {
        next(err)    
    }
    
}

export {
    index,
    show,
    create,
    update,
    destroy,
}