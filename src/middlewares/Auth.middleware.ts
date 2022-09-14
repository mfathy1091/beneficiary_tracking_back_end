import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
    authPayload: any;
}

const auth = (req: Request, res: Response, next:NextFunction) => {
    try {
        // check ac token
        const { authorization: authorizationHeader } = req.headers
        if(!authorizationHeader) {
            return res.status(401).json({ msg: "Authentication faild!" })
        }

        // validate
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.ACCESS_TOKEN as unknown as string, (err, payload) => {
            //if (err) return res.status(401).json({ msg: "Authentication faild!" })

            // success
            (req as AuthRequest).authPayload = payload;
            next();
        })
    } catch (err) {
        return res.status(401).send("Authentication faild!")
    }
}

export default auth