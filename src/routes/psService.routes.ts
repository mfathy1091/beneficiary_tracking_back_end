import express from 'express';
import verifyAuthToken from '../middlewares/verifyJWT.middleware'

import * as controller from '../controllers/psService.controllers'

const router = express.Router();

router.get('/', controller.index)

router.get('/:psServiceId', controller.show)

router.post('/', verifyAuthToken, controller.create) 

router.put('/:psServiceId', verifyAuthToken, controller.update) 

router.delete('/:psServiceId', verifyAuthToken, controller.destroy)



export default router;
