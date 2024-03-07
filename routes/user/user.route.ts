import express from "express";
import { createUser, editUser, getUSers, sample, uploadImage } from "../../controllers/user/user.controller";
const router = express.Router();

router.get('/', sample);

router.post('/create', createUser)

router.get('/list', getUSers)

router.post('/edit', editUser)

router.post('/upload-image', uploadImage)

export default router;
