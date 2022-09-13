import { NextFunction, Request, Response } from 'express'
import AuthService from '../services/authService'
import { BaseUser } from '../models/User'
const authService = new AuthService()
import { validationResult } from 'express-validator/check'
import createToken from '../helpers/createToken'
import jwt from 'jsonwebtoken'

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

  } catch (err) {
    next(err)
  }
}

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  // (1) Validate request parameters, queries using express-validator
  const { username, password } = req.body;
  try {
    // (2) Check if authenticated
    const user = await authService.authenticate(username, password)
    if (user === null) {
      res.status(404).json({ error: 'Wrong credentials' })
    } else {
      const { password, ...userWithoutPassword } = user;
      // (3) Create refresh token and store it in a cookie
      const rf_token = createToken.refresh({ id: user.id });
      res.cookie("_apprftoken", rf_token, {
        httpOnly: true, // to not allow anyone to use javascrept to mess with the token
        path: "/api/auth/access",
        maxAge: 24 * 60 * 60 * 1000, //24h
      })

      //success
      res.status(200).json({ msg: "Sign In success" });
    }
  } catch (err) {
    next(err)
  }
}

const access = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get refresh token
    const rf_token = req.cookies._apprftoken
    if (!rf_token) return res.status(400).json({ msg: "Please sign in" })

    // validate refresh token
    jwt.verify(rf_token, process.env.REFRESH_TOKEN as string, (err: any, user: any) => {
      if (err) return res.status(400).json({ msg: "Please sign in again" });
      // create access token
      const ac_token = createToken.access({ id: user.id })

      // access success
      return res.status(200).json({ ac_token })
    })
  } catch (err) {
    next(err)
  }
}

interface AuthRequest extends Request {
  user: any;
}

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log((req as AuthRequest).user.id)
  try {
    // get info -password
    const user = await authService.getAuthUser((req as AuthRequest).user.id) // user id is comming from the auth middleware
    console.log((req as AuthRequest).user.id)
    res.status(200).json({user})
  } catch (err) {
    next(err)  
  }
}

export {
  register,
  signIn,
  access,
  authUser
}