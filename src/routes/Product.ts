import express from 'express';
import verifyAuthToken from '../middlewares/AuthMiddleware'

import * as controller from '../controllers/Product'

const productRouter = express.Router();

productRouter.get('/', controller.index)

productRouter.get('/:productId', controller.show)

productRouter.post('/', verifyAuthToken, controller.create) 

productRouter.put('/:productId', verifyAuthToken, controller.update) 

productRouter.delete('/:productId', verifyAuthToken, controller.destroy)



export default productRouter;
