import { NextFunction, Request, Response } from 'express'
import AuthService from '../services/authService'
const authService = new AuthService()
import UserModel from '../models/User'
import { BaseUser } from '../models/User'
import { isImportEqualsDeclaration } from 'typescript'


const userModel = new UserModel()

const register = async (req: Request, res: Response, next: NextFunction) => {
  // (1) Validate request parameters, queries using express-validator
  const { username, password } = req.body

  // (2) check for duplicate usernames in the db



  const user: BaseUser = {
    full_name: req.body.fullName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role_id: Number(req.body.roleId),
    is_active: Number(req.body.isActive)
  }


  try {
    // (2) register new user
    const newUser = await authService.register(user)

    // (4) Create employee
    // const employee = await employeeModel.create({ name: params.name, email: params.email, user_id: Number(newUser.id) })

    // (4) Send confirmation email

    //authService.register(username, plainTextPassword);
    res.status(201)
    res.json({
      'message': 'Successfuly created!',
      'user': newUser,
    })

  } catch (err) {
    next(err)
  }
}


export {
  register,
}