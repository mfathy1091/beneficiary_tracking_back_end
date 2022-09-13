import express from 'express';
import verifyAuthToken from '../middlewares/Auth.middleware'

import * as psCaseController from '../controllers/psCase.controllers'
import * as beneficiaryController from '../controllers/beneficiary.controllers'

const router = express.Router();

router.get('/', psCaseController.index)

router.get('/:psCaseId', psCaseController.show)

router.get('/:psCaseId/details', psCaseController.getOne)

router.post('/', verifyAuthToken, psCaseController.create)

router.put('/:psCaseId', verifyAuthToken, psCaseController.update) 

router.delete('/:psCaseId', verifyAuthToken, psCaseController.destroy)


router.post('/:psCaseId/beneficiaries', psCaseController.addBeneficiary)
router.delete('/:psCaseId/beneficiaries/:beneficiaryId', psCaseController.addBeneficiary)
router.put('/:psCaseId/beneficiaries/:beneficiaryId', psCaseController.updateIsDirect)

router.get('/:psCaseId/beneficiaries', beneficiaryController.getBeneficiariesInPsIntake)
export default router;
