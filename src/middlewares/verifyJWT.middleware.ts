import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
  username: any;
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    username: string;
  }
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    // check ac token
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ msg: "Authentication faild!, access token is missing" })
    }

    // (1) Verify the token
    const token = authHeader.split(' ')[1]
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as unknown as string,
      (err, decoded) => {
        if (err) return res.sendStatus(403); //invalid token

        // (2) if verified, attached username to the next middleware / controller
        (req as AuthRequest).username = (decoded as jwt.JwtPayload).username;
        next();
      })
  } catch (err) {
    return res.status(401).send("Authentication faild!")
  }
}

export default verifyJWT