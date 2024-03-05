import express from "express";
import { createUser, editUser, getUSers, sample } from "../../controllers/user/user.controller";
const router = express.Router();

router.get('/', sample);

router.post('/create', createUser)

router.get('/list', getUSers)

router.post('/edit', editUser)

export default router;
