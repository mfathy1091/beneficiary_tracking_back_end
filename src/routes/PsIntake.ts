import express from 'express';
import verifyAuthToken from '../middlewares/AuthMiddleware'

import * as controller from '../controllers/PsIntake'

const psIntakeRouter = express.Router();

psIntakeRouter.get('/', controller.index)

psIntakeRouter.get('/:psIntakeId', controller.show)
psIntakeRouter.get('/:psIntakeId/details', controller.getDetails)

psIntakeRouter.post('/', verifyAuthToken, controller.create) 

psIntakeRouter.put('/:psIntakeId', verifyAuthToken, controller.update) 

psIntakeRouter.delete('/:psIntakeId', verifyAuthToken, controller.destroy)



psIntakeRouter.put('/:psIntakeId/beneficiaries/:beneficiaryId', controller.updateIsDirect)

psIntakeRouter.post('/:psIntakeId/beneficiaries', controller.addBeneficiary)


export default psIntakeRouter;
