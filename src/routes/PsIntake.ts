import express from 'express';
import verifyAuthToken from '../middlewares/AuthMiddleware'

import * as controller from '../controllers/PsIntake'

const psIntakeRouter = express.Router();

psIntakeRouter.get('/', controller.index)

// psIntakeRouter.get('/:psIntakeId', controller.show)

psIntakeRouter.post(':psIntakeId/beneficiaries', controller.addBeneficiary)


psIntakeRouter.post('/', verifyAuthToken, controller.create) 


psIntakeRouter.put('/:psIntakeId', verifyAuthToken, controller.update) 

psIntakeRouter.delete('/:psIntakeId', verifyAuthToken, controller.destroy)

psIntakeRouter.get('/:psIntakeId', controller.getDetails)




export default psIntakeRouter;
