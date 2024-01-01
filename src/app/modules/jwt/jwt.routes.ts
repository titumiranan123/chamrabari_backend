import express from 'express'
import { verifuser } from './jwtMidlleware'

const router = express.Router()
router.post('/', verifuser)
export default router