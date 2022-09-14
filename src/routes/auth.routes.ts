import express from 'express';
import verifyAuthToken from '../middlewares/verifyJWT.middleware'
import { registerSchema } from '../schema/register.schema';
import { loginSchema } from '../schema/login.schema';
import { beneficiarySchema } from '../schema/beneficiary.schema';
import verifyJWT from '../middlewares/verifyJWT.middleware';

import { validateRequestSchema } from '../middlewares/validate-request-schema';
import * as controller from '../controllers/auth.controllers'

const router = express.Router();

router.post('/register', registerSchema, validateRequestSchema, controller.register)
// router.post('/activation', controller.activation)
router.post('/sign-in', loginSchema, validateRequestSchema, controller.signIn)
router.post('/access', controller.access)
router.get('/user', verifyJWT, controller.authUser)

export default router;
