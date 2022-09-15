import { NextFunction, Request, Response } from 'express'
import AuthService from '../services/authService'
const authService = new AuthService()
import UserModel from '../models/User'
import { BaseUser } from '../models/User'
import { validationResult } from 'express-validator/check'
import createToken from '../helpers/createToken'
import jwt from 'jsonwebtoken'

const userModel = new UserModel()

const login = async (req: Request, res: Response) => {
  // (1) Validate request parameters, queries using express-validator
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
  
  try {
    // (2) Check if user exists
    const foundUser  = await authService.getUserByUsername(username);
    
    if (!foundUser){
      console.log("User not found");
      return res.status(400).json({'message': "User not found"}); //Unauthorized 
    } 

    // (3) evaluate password
    const paswordMatch = await authService.isPasswordValid(password, foundUser.password);
    
    if (!paswordMatch){
      console.log("Wrong password");
      return res.status(400).json({'message': "Wrong password"}); //Unauthorized 
    } 
    // (4) create JWTs
    const payload = { "username": foundUser.username }
    const accessToken = createToken.accessToken(payload);
    const refreshToken = createToken.refreshToken(payload);
    
    // (5) save refreshToken in DB with the current user
    const currentUser = { ...foundUser, refresh_token: refreshToken };
    await userModel.update(foundUser.id, currentUser);
    
    // (6) store referesh token in a http-only cookie
    // that way the cookie that contains the refresh token will be in every request
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 *60 *60 * 1000 });
    
    // (7) send the access token
    res.json({accessToken})

  } catch (err) {
    console.log(err)
  }
}

const logout = async (req: Request, res: Response, next: NextFunction) => {
  // On client, also delete the accessToken from the memory
  try {
		// (1) get the refreshToken from the httpOnly cookie
		const cookies = req.cookies;
    console.log('before deletion')
    console.log(cookies?.jwt)

		// if it is not there, it is okay, as we are going to delete it anyway
    if (!cookies?.jwt) return res.sendStatus(204); // successful but No content
    const refreshToken = cookies.jwt;

    // (2) Check if refreshToken exists in DB
    const foundUser  = await authService.getUserByRefreshToken(refreshToken);
		// (3) if no user and yes cookie, then, delete the cookie
		if (!foundUser){
      // no need to specify the maxAge option
			res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
			return res.sendStatus(204)
		} 
		
    // (4) Delete the refreshToken from the DB
		const currentUser = { ...foundUser, refresh_token: '' };
		await userModel.update(currentUser.id, currentUser);

    // (5) Delete the cookie
    /* secure: true - add this option in porduction to only serve on https */
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    console.log('after deletion')
    console.log(cookies?.jwt)
		return res.sendStatus(204)

  } catch (err) {
    return res.status(500).send("Logout faild!"); 
  }
}
interface AuthRequest extends Request {
  username: any;
}

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log((req as AuthRequest).username)
  try {
    // get info without password / refreshToken
    const user = await authService.getUserByUsername((req as AuthRequest).username) // user id is comming from the auth middleware
    const {password, ...userWithoutPassword} = user;
    res.status(200).json({userWithoutPassword})
  } catch (err) {
    next(err)  
  }
}

export {
  login,
  logout,
  authUser
}