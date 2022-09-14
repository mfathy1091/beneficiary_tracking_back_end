import express from 'express';
import verifyJWT from '../middlewares/verifyJWT.middleware'

import * as controller from '../controllers/employee.controllers'

const router = express.Router();

router.get('/', verifyJWT, controller.index)

router.get('/:employeeId', verifyJWT, controller.show)

router.post('/', verifyJWT, controller.create) 

router.put('/:employeeId', verifyJWT, controller.update) 

router.delete('/:employeeId', verifyJWT, controller.destroy)



export default router;
