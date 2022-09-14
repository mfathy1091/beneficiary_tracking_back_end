import { NextFunction, Request, Response } from 'express'
import AuthService from '../services/authService'
const authService = new AuthService()
import UserModel from '../models/User'
import { BaseUser } from '../models/User'
import { validationResult } from 'express-validator/check'
import createToken from '../helpers/createToken'
import jwt from 'jsonwebtoken'

const userModel = new UserModel()

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
    // (2) Check if user exists
    const foundUser  = await authService.getUser(username);
    if (!foundUser) return res.sendStatus(401); //Unauthorized 

    // (3) evaluate password
    const paswordMatch = await authService.isPasswordValid(password, foundUser.password);
    if(paswordMatch) {
      // (4) create JWTs
      const accessToken = jwt.sign(
        { "username": foundUser.username },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '30s' }
      );
      const refreshToken = jwt.sign(
          { "username": foundUser.username },
          process.env.REFRESH_TOKEN_SECRET as string,
          { expiresIn: '1d' }
      );
      
      // (5) save refresh token in DB
      const currentUser = { ...foundUser, refreshToken };
      // // // // // await userModel.update(foundUser.id, currentUser);
      
      // (6) store referesh token in a http-only cookie
      // that way the cookie that contains the refresh token will be in every request
      res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 *60 *60 * 1000 });
      
      // (7) send the access token
      res.json({accessToken})
    }

    if (foundUser  === null) {
      res.status(404).json({ error: 'Wrong credentials' })
    } else {
      const payload = {
        userId: foundUser.id,
        username: foundUser.username,
        name: foundUser.name,
        email: foundUser.email,
        avatarUrl: foundUser.avatar_url,
        roleName: foundUser.role_name,
        permissions: []
      }
      // (3) Create refresh token and store it in a cookie
      const rf_token = createToken.refresh(payload);
      res.cookie("_apprftoken", rf_token, {
        httpOnly: true, // to not allow anyone to use javascrept to mess with the token
        path: "/api/auth/access",
        maxAge: 24 * 60 * 60 * 1000, //24h
      })

      //success
      res.status(200).json({ msg: "Sign In success", rf_token });
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
    jwt.verify(rf_token, process.env.REFRESH_TOKEN as string, (err: any, payload: any) => {
      if (err) return res.status(400).json({ msg: "Please sign in again" });
      // create access token
      const {ait, exp, ...ac_token_payload} = payload

      const ac_token = createToken.access(ac_token_payload)

      // access success
      return res.status(200).json({ ac_token })
    })
  } catch (err) {
    next(err)
  }
}

interface AuthRequest extends Request {
  authPayload: any;
}

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log((req as AuthRequest).authPayload)
  try {
    // get info without password
    const user = await authService.getAuthUser((req as AuthRequest).authPayload.userId) // user id is comming from the auth middleware

    console.log((req as AuthRequest).authPayload.userId)
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