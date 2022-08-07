import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/User'
import { BaseUser } from '../models/User'


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
    update,
    destroy,
}