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
import registerRouter from './register.routes'
import authRouter from './auth.routes'
import refreshTokenRouter from './refreshToken.routes'
import app from './../server'
import verifyJWT from '../middlewares/verifyJWT.middleware';


const router = express.Router();

router.use('/register', registerRouter)
router.use('/auth', authRouter)
// this will receive the cookie that has the refresh token
// and issue a new access token when it is expired
router.use('/refresh-token', refreshTokenRouter) 
// app.use(verifyJWT);
router.use('/roles', verifyJWT, roleRouter)
router.use('/users', verifyJWT, userRouter)
router.use('/products', verifyJWT, productRouter)
router.use('/orders', verifyJWT, orderRouter)
router.use('/employees', verifyJWT, employeeRouter)
router.use('/beneficiaries', verifyJWT, beneficiaryRouter)
router.use('/ps-cases', verifyJWT, psCaseRouter)
router.use('/ps-services', verifyJWT, psServiceRouter)

router.use('/upload', uploadRouter)
export default router;
