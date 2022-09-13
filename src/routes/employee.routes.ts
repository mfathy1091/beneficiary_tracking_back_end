import express from 'express';
import auth from '../middlewares/Auth.middleware'

import * as controller from '../controllers/employee.controllers'

const router = express.Router();

router.get('/', controller.index)

router.get('/:employeeId', controller.show)

router.post('/', auth, controller.create) 

router.put('/:employeeId', auth, controller.update) 

router.delete('/:employeeId', auth, controller.destroy)



export default router;
