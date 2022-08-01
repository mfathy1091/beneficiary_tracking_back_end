import express from 'express';
import verifyAuthToken from '../middlewares/authMiddleware'

import * as psIntakeController from '../controllers/psIntakeController'
import * as beneficiaryController from '../controllers/beneficiaryController'
import { psIntakeService } from '../services/PsIntakeService';

const router = express.Router();

router.get('/', psIntakeController.index)

router.get('/:psIntakeId', psIntakeController.show)
router.get('/:psIntakeId/details', psIntakeService.getOne)

router.post('/', verifyAuthToken, psIntakeController.create) 

router.put('/:psIntakeId', verifyAuthToken, psIntakeController.update) 

router.delete('/:psIntakeId', verifyAuthToken, psIntakeController.destroy)


router.post('/:psIntakeId/beneficiaries', psIntakeController.addBeneficiary)
router.delete('/:psIntakeId/beneficiaries/:beneficiaryId', psIntakeController.addBeneficiary)
router.put('/:psIntakeId/beneficiaries/:beneficiaryId', psIntakeController.updateIsDirect)

router.get('/:psIntakeId/beneficiaries', beneficiaryController.getBeneficiariesInPsIntake)
export default router;
