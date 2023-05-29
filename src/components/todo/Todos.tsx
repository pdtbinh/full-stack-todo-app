import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TodosProps } from '../../types/types';
import Todo from './Todo';
import { backendURL, fetchData } from '../../utils/utils';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Error from '../error/Error';
import './todoStyle.css'
import '../error/errorStyle.css'

const Todos: React.FC<TodosProps> = ({ user, logUserOut }) => {

    const navigate = useNavigate()

    const [todos, setTodos] = useState<any>([])

    const [content, setContent] = useState<string>('')

    const [addingTodo, setAddingTodo] = useState<boolean>(false)

    const [openError, setOpenError] = useState<boolean>(false)

    const [errorMsg, setErrorMsg] = useState<string>('')

    const fetchTodo = async () => {
        if (user) {
            const response = await fetchData(
                { url: `${backendURL}/todos`, method: 'get', body: null }
            )
            const todos = await response.json()
            if (todos?.[0]) setTodos(todos)
        } else {
            navigate('/login')
        }      
    }
    useEffect(() => {fetchTodo()}, [])

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)

    const handleAddTodo = async () => {
        try {
            if (content !== '') {
                const response = await fetchData(
                    { url: `${backendURL}/todos`, method: 'post', body: { content } }
                )
                const todos = await response.json()
                if (todos?.[0]) setTodos(todos)
                setContent('')
                setAddingTodo(false)
            } else {
                setOpenError(true)
                setErrorMsg('Todo cannot be empty.')
            }
        } catch (err: any) {
            setOpenError(true)
            setErrorMsg('Internal error. Please reload and try again.')
        }
    }

    const handleCancelAddTodo = () => {
        setAddingTodo(false)
        setContent('')
    }

    const handleLogout =  async () => {
        try {
            const response = await fetchData(
                { url: `${backendURL}/logout`, method: 'post', body: null }
            )
            if (response.status === 204) {
                logUserOut()
                navigate('/login')
            }
        } catch (err: any) {
            setOpenError(true)
            setErrorMsg('Internal error. Please reload and try again.')
        }
    }

    const editTodo = (id: number, editContent: string) => {
        const todosCopy = [ ...todos ]
        const index = todosCopy.findIndex(el => el.id === id)
        todosCopy[index] = { ...todosCopy[index], content: editContent }
        setTodos(todosCopy) 
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((el: any) => el.id !== id)) 
    }

    const handleCloseError = () => {
        setOpenError(false)
        setErrorMsg('')
    }

    return (
      <div>
        {todos.map(
            (item: any) => <Todo 
                id={item.id} 
                userID={item.user_id} 
                key={item.id} 
                content={ item.content } 
                editTodo={editTodo} 
                deleteTodo={deleteTodo}/>
        )}

        {addingTodo ? <div className='Todo'>
            <div className='TodoContent'>
                <TextField className='TodoInput' value={content} onChange={handleContentChange} />
                <div>
                    <Button variant='contained' className='GreenButton' onClick={handleAddTodo}>
                        Add
                    </Button>
                    <Button variant='contained' className='RedButton' onClick={handleCancelAddTodo}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div> : null}

        {!addingTodo ? <div>
            <Button variant='contained' className='BlueButton' onClick={() => setAddingTodo(true)}>
                Add todo
            </Button>
            <Button variant='contained' className='RedButton' onClick={handleLogout}>
                Logout
            </Button>
        </div> : null}

            
        <Error openError={openError} message={errorMsg}>
            <Button className='ErrorClose' onClick={handleCloseError}>Close</Button>
        </Error>
      </div>
    );
};

export default Todos
