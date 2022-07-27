import express from 'express';
import verifyAuthToken from '../middlewares/AuthMiddleware'

import * as controller from '../controllers/Order'

const orderRouter = express.Router();

orderRouter.get('/', verifyAuthToken, controller.index)

orderRouter.get('/:orderId', verifyAuthToken, controller.show)

orderRouter.post('/', verifyAuthToken, controller.create) 

orderRouter.put('/:orderId', verifyAuthToken, controller.update) 

orderRouter.delete('/:orderId', verifyAuthToken, controller.destroy)

orderRouter.post('/:orderId/products', verifyAuthToken, controller.addProduct)


export default orderRouter;
