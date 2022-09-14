import express from 'express';
import { loginSchema } from '../schema/login.schema';
import { beneficiarySchema } from '../schema/beneficiary.schema';
import verifyJWT from '../middlewares/verifyJWT.middleware';

import { validateRequestSchema } from '../middlewares/validate-request-schema';
import * as controller from '../controllers/auth.controllers'

const router = express.Router();

// router.post('/activation', controller.activation)
router.post('/login', controller.login)
router.get('/user', verifyJWT, controller.authUser)
router.post('/logout', controller.logout)

export default router;
