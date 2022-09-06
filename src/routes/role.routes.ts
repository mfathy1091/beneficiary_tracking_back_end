import express from 'express';
import verifyAuthToken from '../middlewares/checkAuth.middleware'
import * as roleController from '../controllers/role.controllers'

const router = express.Router();

router.get('/', roleController.index)

router.get('/:roleId', roleController.show)

router.post('/', verifyAuthToken, roleController.create) 

router.put('/:roleId', verifyAuthToken, roleController.update) 

router.delete('/:roleId', verifyAuthToken, roleController.destroy)


export default router;
