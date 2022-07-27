import express from 'express';
import verifyAuthToken from '../middlewares/AuthMiddleware'

import * as controller from '../controllers/User'

const userRouter = express.Router();

userRouter.get('/', verifyAuthToken, controller.index)

userRouter.get('/:userId', verifyAuthToken, controller.show)

userRouter.post('/', controller.create)

userRouter.put('/:userId', verifyAuthToken, controller.update)

userRouter.delete('/:userId', verifyAuthToken, controller.destroy)


export default userRouter;
