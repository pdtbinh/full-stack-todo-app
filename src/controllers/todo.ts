import pool from '../db/pool'
import { Request, Response, NextFunction } from 'express'
import { User } from '../types/types'
import { wrapAsync  } from '../utils/wrappers'
import { getUserIDbyTodoID } from '../utils/utils'

export const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    const inner = async (req: Request, res: Response, next: NextFunction) => {
        const user_id: number = (req.user as User).id
        const todo = await pool.query('SELECT * FROM todo WHERE user_id = $1', [user_id])
        res.status(200).json((todo.rows as User[]))
    }
    await wrapAsync(inner)(req, res, next)
}

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    const inner = async (req: Request, res: Response, next: NextFunction) => {
        const { content } = req.body
        const user_id: number = (req.user as User).id
        await pool.query(
            'INSERT INTO todo (user_id, content) VALUES ($1, $2)',
            [user_id, content]
        )
        const todo = await pool.query('SELECT * FROM todo WHERE user_id = $1', [user_id])
        res.status(201).json((todo.rows as User[]))
    }
    await wrapAsync(inner)(req, res, next)
}

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    const inner = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const user_id = await getUserIDbyTodoID(parseInt(id))
        const auth_user_id: number = (req.user as User).id
        if (user_id !== auth_user_id) {
            return res.status(401).json({ 'error': 'Unauthenticated request.' })
        }
        await pool.query(
            'DELETE FROM todo WHERE id = $1',
            [parseInt(id)]
        )
        res.status(204).end()
    }
    await wrapAsync(inner)(req, res, next)
}

export const editTodo = async (req: Request, res: Response, next: NextFunction) => {
    const inner = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const { editContent } = req.body
        const user_id = await getUserIDbyTodoID(parseInt(id))
        const auth_user_id = (req.user as User).id
        if (user_id !==  auth_user_id) {
            return res.status(401).json({ 'error': 'Unauthenticated request.' })
        }
        await pool.query(
            'UPDATE todo SET content = $1 WHERE id = $2',
            [editContent, parseInt(id)]
        )
        res.status(204).end()
    }
    await wrapAsync(inner)(req, res, next)
}