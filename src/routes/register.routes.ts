import express from 'express';
import verifyJWT from '../middlewares/verifyJWT.middleware';
import { registerSchema } from '../schema/register.schema';
import { validateRequestSchema } from '../middlewares/validate-request-schema';

import * as controller from '../controllers/register.controllers'

const router = express.Router();

router.post('/', registerSchema, validateRequestSchema, controller.register)


export default router;
