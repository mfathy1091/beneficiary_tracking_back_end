import express from 'express';
import verifyJWT from '../middlewares/verifyJWT.middleware'
import { beneficiarySchema } from '../schema/beneficiary.schema';
import { validateRequestSchema } from '../middlewares/validate-request-schema';
import * as beneficiaryController from '../controllers/beneficiary.controllers'

const router = express.Router();

router.get('/', verifyJWT, beneficiaryController.getAll)

router.get('/:beneficiaryId', verifyJWT, beneficiaryController.getOne)

router.post('/', verifyJWT, beneficiarySchema, validateRequestSchema, beneficiaryController.createOne) 

router.put('/:beneficiaryId', verifyJWT, beneficiaryController.updateOne) 

router.delete('/:beneficiaryId', verifyJWT, beneficiaryController.deleteOne)

//router.post('/:beneficiaryId/ps-services', verifyJWT, beneficiaryController.addPsService)



export default router;
