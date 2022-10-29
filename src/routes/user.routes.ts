import express from 'express';
import verifyAuthToken from '../middlewares/verifyJWT.middleware'

import * as controller from '../controllers/user.controllers'

const router = express.Router();

router.get('/', controller.index)

router.get('/:userId', controller.show)

router.put('/:userId', controller.update)

router.delete('/:userId', controller.destroy)


export default router;
