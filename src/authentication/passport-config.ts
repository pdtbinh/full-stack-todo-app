import { Strategy as LocalStrategy } from "passport-local"
import bcrypt from 'bcrypt'

function initializePassport(passport: any, getUserByEmail: any, getUserByID: any) {

    const authenticateUser = async (email: string, password: string, done: any) => {

        const user = await getUserByEmail(email)

        if (!user) {
            return done(null, false, { message: 'No user with that email.' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect.' })
            }
        } catch (err: any) {
            return done(err)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user: any, done: any) => done(null, user.id))
    passport.deserializeUser(async (id: string, done: any) => done(null, await getUserByID(id)))
}

export default initializePassport