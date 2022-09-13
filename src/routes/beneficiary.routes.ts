import express from 'express';
import verifyAuthToken from '../middlewares/Auth.middleware'
import { beneficiarySchema } from '../schema/beneficiary.schema';
import { validateRequestSchema } from '../middlewares/validate-request-schema';
import * as beneficiaryController from '../controllers/beneficiary.controllers'

const router = express.Router();

router.get('/', beneficiaryController.getAll)

router.get('/:beneficiaryId', beneficiaryController.getOne)

router.post('/', verifyAuthToken, beneficiarySchema, validateRequestSchema, beneficiaryController.createOne) 

router.put('/:beneficiaryId', verifyAuthToken, beneficiaryController.updateOne) 

router.delete('/:beneficiaryId', verifyAuthToken, beneficiaryController.deleteOne)

//router.post('/:beneficiaryId/ps-services', verifyAuthToken, beneficiaryController.addPsService)



export default router;
