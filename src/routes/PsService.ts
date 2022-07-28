import express from 'express';
import verifyAuthToken from '../middlewares/AuthMiddleware'

import * as controller from '../controllers/PsService'

const psServiceRouter = express.Router();

psServiceRouter.get('/', controller.index)

psServiceRouter.get('/:psServiceId', controller.show)

psServiceRouter.post('/', verifyAuthToken, controller.create) 

psServiceRouter.put('/:psServiceId', verifyAuthToken, controller.update) 

psServiceRouter.delete('/:psServiceId', verifyAuthToken, controller.destroy)



export default psServiceRouter;
