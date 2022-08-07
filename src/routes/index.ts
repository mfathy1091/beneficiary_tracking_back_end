import express from 'express';
import userRouter from './user.routes';
import orderRouter from './order.routes';
import productRouter from './product.routes';
import employeeRouter from './employee.routes';
import beneficiaryRouter from './beneficiary.routes';
import psIntakeRouter from './psIntake.routes'
import psServiceRouter from './psService.routes'
import * as authController from '../controllers/auth.controllers'
import { registerSchema } from '../schema/register.schema';
import { validateRequestSchema } from '../middlewares/validate-request-schema';
import { loginSchema } from '../schema/login.schema';

const router = express.Router();

router.post('/register', registerSchema, validateRequestSchema, authController.register)
router.post('/login', loginSchema, validateRequestSchema, authController.login)


router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)
router.use('/employees', employeeRouter)
router.use('/beneficiaries', beneficiaryRouter)
router.use('/ps-intakes', psIntakeRouter)
router.use('/ps-services', psServiceRouter)

export default router;
