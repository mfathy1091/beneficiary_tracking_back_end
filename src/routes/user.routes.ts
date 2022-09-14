import express from 'express';
import verifyAuthToken from '../middlewares/verifyJWT.middleware'

import * as controller from '../controllers/user.controllers'

const router = express.Router();

router.get('/', verifyAuthToken, controller.index)

router.get('/:userId', verifyAuthToken, controller.show)

router.put('/:userId', verifyAuthToken, controller.update)

router.delete('/:userId', verifyAuthToken, controller.destroy)


export default router;
