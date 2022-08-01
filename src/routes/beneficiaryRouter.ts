import express from 'express';
import verifyAuthToken from '../middlewares/authMiddleware'

import * as beneficiaryController from '../controllers/beneficiaryController'

const router = express.Router();

router.get('/', beneficiaryController.getAll)

router.get('/:beneficiaryId', beneficiaryController.getOne)

router.post('/', verifyAuthToken, beneficiaryController.createOne) 

router.put('/:beneficiaryId', verifyAuthToken, beneficiaryController.updateOne) 

router.delete('/:beneficiaryId', verifyAuthToken, beneficiaryController.deleteOne)

//router.post('/:beneficiaryId/ps-services', verifyAuthToken, beneficiaryController.addPsService)



export default router;
