import express from 'express';
import verifyAuthToken from '../middlewares/checkAuth.middleware'

import * as psIntakeController from '../controllers/psIntake.controllers'
import * as beneficiaryController from '../controllers/beneficiary.controllers'

const router = express.Router();

router.get('/', psIntakeController.index)

router.get('/:psIntakeId', psIntakeController.show)
<<<<<<< HEAD
router.get('/:psIntakeId/details', psIntakeController.getOne) 
=======
router.get('/:psIntakeId/details', psIntakeController.getOne)
>>>>>>> e895ca4d5abb7f0f66782397c0e7e048e9ba2107

router.post('/', verifyAuthToken, psIntakeController.create) 

router.put('/:psIntakeId', verifyAuthToken, psIntakeController.update) 

router.delete('/:psIntakeId', verifyAuthToken, psIntakeController.destroy)


router.post('/:psIntakeId/beneficiaries', psIntakeController.addBeneficiary)
router.delete('/:psIntakeId/beneficiaries/:beneficiaryId', psIntakeController.addBeneficiary)
router.put('/:psIntakeId/beneficiaries/:beneficiaryId', psIntakeController.updateIsDirect)

router.get('/:psIntakeId/beneficiaries', beneficiaryController.getBeneficiariesInPsIntake)
export default router;
