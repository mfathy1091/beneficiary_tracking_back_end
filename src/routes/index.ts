import express from 'express';
import roleRouter from './role.routes';
import userRouter from './user.routes';
import orderRouter from './order.routes';
import productRouter from './product.routes';
import employeeRouter from './employee.routes';
import beneficiaryRouter from './beneficiary.routes';
import psCaseRouter from './psCase.routes'
import psServiceRouter from './psService.routes'
import uploadRouter from './upload.routes'

import * as authController from '../controllers/auth.controllers'
import { registerSchema } from '../schema/register.schema';
import { loginSchema } from '../schema/login.schema';
import { beneficiarySchema } from '../schema/beneficiary.schema';

import { validateRequestSchema } from '../middlewares/validate-request-schema';


const router = express.Router();

router.post('/register', registerSchema, validateRequestSchema, authController.register)
router.post('/login', loginSchema, validateRequestSchema, authController.login)

router.use('/roles', roleRouter)
router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)
router.use('/employees', employeeRouter)
router.use('/beneficiaries', beneficiaryRouter)
router.use('/ps-cases', psCaseRouter)
router.use('/ps-services', psServiceRouter)

router.use('/upload', uploadRouter)
export default router;
