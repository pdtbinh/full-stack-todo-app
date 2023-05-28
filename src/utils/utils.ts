import pool from '../db/pool'
import { Todo, User } from '../types/types'

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
    try {
        const user = await pool.query('SELECT * FROM doer WHERE email = $1', [email])
        return (user.rows as User[])[0]
    } catch (err: any) {
        console.error(err.message)
    }
}

export const getUserByID = async (id: number): Promise<User | undefined> => {
    try {
        const user = await pool.query('SELECT * FROM doer WHERE id = $1', [id])
        return (user.rows as User[])[0]
    } catch (err: any) {
        console.error(err.message)
    }
}

export const getUserIDbyTodoID = async (id: number): Promise<number | undefined> => {
    try {
        const todo = await pool.query('SELECT * FROM todo WHERE id = $1', [id])
        return (todo.rows as Todo[])[0].user_id
    } catch (err: any) {
        console.error(err.message)
    }
}