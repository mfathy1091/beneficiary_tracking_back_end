import express from 'express';
import verifyAuthToken from '../middlewares/AuthMiddleware'

import * as controller from '../controllers/Beneficiary'

const beneficiaryRouter = express.Router();

beneficiaryRouter.get('/', controller.index)

beneficiaryRouter.get('/:beneficiaryId', controller.show)

beneficiaryRouter.post('/', verifyAuthToken, controller.create) 

beneficiaryRouter.put('/:beneficiaryId', verifyAuthToken, controller.update) 

beneficiaryRouter.delete('/:beneficiaryId', verifyAuthToken, controller.destroy)



export default beneficiaryRouter;
