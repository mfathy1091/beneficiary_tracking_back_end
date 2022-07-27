import express from 'express';

import * as controller from '../controllers/Auth'

const authRouter = express.Router();

authRouter.post('/login', controller.login)


export default authRouter;
