import express from 'express'
import { deleteUser, getUser, loggedUser, loginUser, registerUser, updateUser } from './user.controler';
import { adminAuthentication } from '../jwt/adminAuthentication';
import { jwtVerify } from '../jwt/jwtRoutes';
import { superadminAuthentication } from '../jwt/superAdminAuthentication';

const router = express.Router()
//SUPER ADMIN ROUTE
router.put('/user/:userId', jwtVerify, superadminAuthentication, updateUser)

// admin user
router.delete('/user/:userId', jwtVerify, superadminAuthentication || adminAuthentication, deleteUser)

// SUPER ADMIN AND ADMIN 
router.get('/user', jwtVerify, superadminAuthentication || adminAuthentication, getUser)

// common user 
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/loggeduser', jwtVerify, loggedUser)

export default router;