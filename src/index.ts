// Requirements
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import passport from 'passport'
import initializePassport from './authentication/passport-config'
import flash from 'express-flash'
import session from 'express-session'
import dotenv from 'dotenv'
import authRoute from './routes/auth'
import todoRoute from './routes/todo'
import { getUserByEmail, getUserByID } from './utils/utils'
import cookieParser from 'cookie-parser'

import genFunc from 'connect-pg-simple';
import pool from './db/pool'
const PostgresqlStore = genFunc(session);

// Initialization
const app = express()
initializePassport(passport, getUserByEmail, getUserByID)
dotenv.config()

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.SESSION_SECRET || ''))
app.use(cors({
    origin : 'https://6474534782d5094b04b6faf0--shiny-sfogliatella-be576b.netlify.app',
    credentials: true,
}))
app.use(express.json())
app.use(bodyParser.json())
app.use(flash())
app.use(session({ 
    store: new PostgresqlStore({
        pool: pool,
        conString: process.env.DATABASE_URL,
        tableName: 'sessions'
    }),
    secret: process.env.SESSION_SECRET || '',
    resave: true,
    saveUninitialized: true,
    proxy: true,
    cookie: {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 3600 * 24 * 7),
        maxAge: 1000 * 3600 * 24 * 7,
        sameSite: 'none',
        secure: true,
    }
 }))
 app.use(passport.initialize())
 app.use(passport.session())

// Routes
app.use('/todos', todoRoute)
app.use('/', authRoute)

// Running server...
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})