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

// Initialization
const app = express()
initializePassport(passport, getUserByEmail, getUserByID)
dotenv.config()

// Middleware
app.use(cors({
    origin : 'https://6474300d37f6b0327a80ec10--adorable-alfajores-27f7f2.netlify.app',
    credentials: true,
}))
app.use(express.json())
app.use(bodyParser.json())
app.use(flash())
app.use(session({ 
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false
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