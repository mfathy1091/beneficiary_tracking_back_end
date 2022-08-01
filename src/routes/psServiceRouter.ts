import express from 'express';
import verifyAuthToken from '../middlewares/authMiddleware'

import * as controller from '../controllers/psServiceController'

const router = express.Router();

router.get('/', controller.index)

router.get('/:psServiceId', controller.show)

router.post('/', verifyAuthToken, controller.create) 

router.put('/:psServiceId', verifyAuthToken, controller.update) 

router.delete('/:psServiceId', verifyAuthToken, controller.destroy)



export default router;
