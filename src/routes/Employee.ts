import express from 'express';
import verifyAuthToken from '../middlewares/AuthMiddleware'

import * as controller from '../controllers/Employee'

const employeeRouter = express.Router();

employeeRouter.get('/', controller.index)

employeeRouter.get('/:employeeId', controller.show)

employeeRouter.post('/', verifyAuthToken, controller.create) 

employeeRouter.put('/:employeeId', verifyAuthToken, controller.update) 

employeeRouter.delete('/:employeeId', verifyAuthToken, controller.destroy)



export default employeeRouter;
