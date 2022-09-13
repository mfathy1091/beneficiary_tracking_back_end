import express from 'express';
import verifyAuthToken from '../middlewares/Auth.middleware'

import * as controller from '../controllers/order.controllers'

const router = express.Router();

router.get('/', verifyAuthToken, controller.index)

router.get('/:orderId', verifyAuthToken, controller.show)

router.post('/', verifyAuthToken, controller.create) 

router.put('/:orderId', verifyAuthToken, controller.update) 

router.delete('/:orderId', verifyAuthToken, controller.destroy)

router.post('/:orderId/products', verifyAuthToken, controller.addProduct)


export default router;
