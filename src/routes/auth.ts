import express from 'express'
import { checkUnauthenticated, register, login, sendUser, failedLogin, checkAuthenticated, logout } from '../controllers/auth'

const router = express.Router()

router
    .route('/')
    .get(checkAuthenticated, sendUser)

router
    .route('/login')
    .post(checkUnauthenticated, login, sendUser)

router
    .route('/register')
    .post(checkUnauthenticated, register, login, sendUser)

router
    .route('/failed_login')
    .get(failedLogin)

router
    .route('/logout')
    .post(checkAuthenticated, logout)

export default router