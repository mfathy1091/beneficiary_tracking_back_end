import express from 'express';
import userRouter from './userRouter';
import orderRouter from './orderRouter';
import productRouter from './productRouter';
import employeeRouter from './employeeRouter';
import beneficiaryRouter from './beneficiaryRouter';
import psIntakeRouter from './psIntakeRouter'
import psServiceRouter from './psServiceRouter'
import * as authController from '../controllers/authController'

const router = express.Router();

router.post('/register', authController.register)
router.post('/login', authController.login)


router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)
router.use('/employees', employeeRouter)
router.use('/beneficiaries', beneficiaryRouter)
router.use('/ps-intakes', psIntakeRouter)
router.use('/ps-services', psServiceRouter)

export default router;
