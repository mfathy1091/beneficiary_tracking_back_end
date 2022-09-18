import express from 'express';
import upload from '../middlewares/upload.middleware'
import uploadImage from '../middlewares/uploadImage'
import * as uploadController from '../controllers/upload.controllers'
import verifyJWT from '../middlewares/verifyJWT.middleware'

const router = express.Router();

router.post('/avatar', uploadImage, upload, verifyJWT, uploadController.uploadAvatar)

export default router;