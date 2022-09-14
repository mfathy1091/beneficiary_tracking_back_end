import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import AuthService from '../services/authService'
import createToken from '../helpers/createToken'

const authService = new AuthService()

interface AuthRequest extends Request {
  user: any;
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    username: string;
  }
}

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
		// (1) get the refreshToken from the httpOnly cookie
		const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    // (2) Check if user exists
    const foundUser  = await authService.getUserByRefreshToken(refreshToken);
		if (!foundUser) return res.sendStatus(403); //Forbidden 
		
    // (3) Verify the refreshToken
    jwt.verify(
      refreshToken as string,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err, decoded) => {
        if (err || foundUser.username !== (decoded as jwt.JwtPayload).username) return res.sendStatus(403); //invalid token

				// (4) create access token
				const payload = { "username": foundUser.username }
				const accessToken = createToken.accessToken(payload);
				
				// (5) send back access token
				res.json({ accessToken })
				})
  } catch (err) {
    return res.status(401).send("Authentication faild!")
  }
}

export {
	refreshToken
}