import express from 'express';
import verifyAuthToken from '../middlewares/authMiddleware'

import * as controller from '../controllers/productController'

const router = express.Router();

router.get('/', controller.index)

router.get('/:productId', controller.show)

router.post('/', verifyAuthToken, controller.create) 

router.put('/:productId', verifyAuthToken, controller.update) 

router.delete('/:productId', verifyAuthToken, controller.destroy)



export default router;
