import express from 'express'
import { jwtVerify } from '../jwt/jwtRoutes';
import { superadminAuthentication } from '../jwt/superAdminAuthentication';
import { adminAuthentication } from '../jwt/adminAuthentication';
import { createBlog } from './blog.controler';
const router = express.Router();

router.post('/', jwtVerify, superadminAuthentication || adminAuthentication,createBlog )
router.get('/' )
router.delete('/', jwtVerify, superadminAuthentication || adminAuthentication, )
export default router;