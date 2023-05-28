import express from 'express'
import { getAllTodos, createTodo, deleteTodo, editTodo } from '../controllers/todo'
import { checkAuthenticated } from '../controllers/auth'

const router = express.Router()

router
    .route('/')
    .get(checkAuthenticated, getAllTodos)
    .post(checkAuthenticated, createTodo)

router
    .route('/:id')
    .delete(checkAuthenticated, deleteTodo)
    .put(checkAuthenticated, editTodo)

export default router