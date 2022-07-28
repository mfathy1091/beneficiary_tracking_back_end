import express from 'express';
import verifyAuthToken from '../middlewares/AuthMiddleware'

import * as psIntakeController from '../controllers/PsIntake'

const psIntakeRouter = express.Router();

psIntakeRouter.get('/', psIntakeController.index)

psIntakeRouter.get('/:psIntakeId', psIntakeController.show)
psIntakeRouter.get('/:psIntakeId/details', psIntakeController.getDetails)

psIntakeRouter.post('/', verifyAuthToken, psIntakeController.create) 

psIntakeRouter.put('/:psIntakeId', verifyAuthToken, psIntakeController.update) 

psIntakeRouter.delete('/:psIntakeId', verifyAuthToken, psIntakeController.destroy)



psIntakeRouter.put('/:psIntakeId/beneficiaries/:beneficiaryId', psIntakeController.updateIsDirect)

psIntakeRouter.post('/:psIntakeId/beneficiaries', psIntakeController.addBeneficiary)
psIntakeRouter.post('/:psIntakeId/beneficiaries/:beneficiaryId/services', psIntakeController.addService)

export default psIntakeRouter;
