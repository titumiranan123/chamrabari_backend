import express from 'express'
import { createUser, getUser, userLogin } from './user.controler';
const router = express.Router();

router.post('/register', createUser)
router.post('/login', userLogin)
router.get('/', getUser)
export default router;