import bcrypt from 'bcrypt'
import pool from '../db/pool'
import passport from 'passport'
import { wrapAsync, wrapNonAsync } from '../utils/wrappers'
import { Request, Response, NextFunction } from 'express'
import { RegisterRequestBody, User } from '../types/types'
import { getUserByEmail } from '../utils/utils'

export const checkAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const inner = (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            return next()
        }
        res.status(401).json({ 'error': 'Unauthenticated request.' })
    }
    wrapNonAsync(inner)(req, res, next)
}

export const checkUnauthenticated = (req: Request, res: Response, next: NextFunction) => {
    const inner = (req: Request, res: Response, next: NextFunction) => {
        if (!req.isAuthenticated()) {
            return next()
        }
        res.status(400).json({ 'error': 'You are already logged in.' })
    }
    wrapNonAsync(inner)(req, res, next)
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    console.log('************ enter register')
    const inner = async (req: Request, res: Response, next: NextFunction) => {
        const { fullname, email, password }: RegisterRequestBody = req.body
        const user = await getUserByEmail(email)
        if (user) {
            return res.status(409).json({'error': 'This email has already been used.'})
        }   
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log('************ password', hashedPassword)
        const result = await pool.query(
            'INSERT INTO doer (fullname, email, password) VALUES ($1, $2, $3)',
            [fullname, email, hashedPassword])
        console.log('************ done register', result)
        return next()
    }
    await wrapAsync(inner)(req, res, next)
}

export const login = passport.authenticate(
    'local', 
    {
        failureRedirect: '/failed_login',
        failureFlash: true,
        failureMessage: true
    }
)

export const logout = (req: Request, res: Response, next: NextFunction) => {
    const inner = async (req: Request, res: Response, next: NextFunction) => {
        req.logout(function (err) {
            if (err) return next(err)
        })
        res.status(204).end()
    }
    wrapNonAsync(inner)(req, res, next)
}

export const sendUser = (req: Request, res: Response) => res.status(200).json(req.user as User)

export const failedLogin = (req: Request, res: Response) => res.status(400).json({ 'error': 'Failed to login.' })