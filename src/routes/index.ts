import express from 'express';
import userRouter from './User';
import authRouter from './Auth';
import orderRouter from './Order';
import productRouter from './Product';
import employeeRouter from './Employee';
import beneficiaryRouter from './Beneficiary';
import psIntakeRouter from './PsIntake'

const router = express.Router();
router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)
router.use('/employees', employeeRouter)
router.use('/beneficiaries', beneficiaryRouter)
router.use('/ps-intakes', psIntakeRouter)

export default router;
