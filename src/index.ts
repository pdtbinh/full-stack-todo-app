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
import genFunc from 'connect-pg-simple';



// Initialization
const app = express()
initializePassport(passport, getUserByEmail, getUserByID)
dotenv.config()


const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
  conString: process.env.DATABASE_URL,
});

// Middleware
app.use(cors({
    origin : 'http://localhost:3000',
    credentials: true,
}))
app.use(express.json())
app.use(bodyParser.json())
app.use(flash())
app.use(session({ 
    store: sessionStore,
    secret: process.env.SESSION_SECRET || '',
    resave: true,
    saveUninitialized: true,
    proxy: true,
    cookie: {
      maxAge: 3600000,
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