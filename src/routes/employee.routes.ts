import express from 'express';
import verifyAuthToken from '../middlewares/checkAuth.middleware'

import * as controller from '../controllers/employee.controllers'

const router = express.Router();

router.get('/', controller.index)

router.get('/:employeeId', controller.show)

router.post('/', verifyAuthToken, controller.create) 

router.put('/:employeeId', verifyAuthToken, controller.update) 

router.delete('/:employeeId', verifyAuthToken, controller.destroy)



export default router;
