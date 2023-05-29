import React, { useState } from 'react'
import { TodoProps } from '../../types/types';
import { backendURL, fetchData } from '../../utils/utils';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import './todoStyle.css'
import Error from '../error/Error';
import '../error/errorStyle.css'

const Todo: React.FC<TodoProps> = ({ id, userID, content, editTodo, deleteTodo }) => {

    const [edit, setEdit] = useState<boolean>(false)

    const [editContent, setEditContent] = useState<string>(content)

    const [openError, setOpenError] = useState<boolean>(false)

    const [errorMsg, setErrorMsg] = useState<string>('')

    const handleEditContentChange = (e: React.ChangeEvent<HTMLInputElement>) => setEditContent(e.target.value)

    const handleEditTodo = async () => {
        try {
            const response = await fetchData(
                { url: `${backendURL}/todos/${id}`, method: 'put', body: { editContent } }
            )
            if (response.status === 204) editTodo(id, editContent)
            setEdit(false)
        } catch (err: any) {
            setOpenError(true)
            setErrorMsg('Internal error. Please reload and try again.')
        }
    }

    const handleDeleteTodo = async () => {
        try {
            const response = await fetchData(
                { url: `${backendURL}/todos/${id}`, method: 'delete', body: null }
            )
            if (response.status === 204) deleteTodo(id)
        } catch (err: any) {
            setOpenError(true)
            setErrorMsg('Internal error. Please reload and try again.')
        }
    }

    const handleCloseError = () => {
        setOpenError(false)
        setErrorMsg('')
    }

    return (
        <div className='Todo'>
            {edit ? <div className='TodoContent'>
                <TextField className='TodoInput' type="text" value={editContent} onChange={handleEditContentChange} /> 
                <div>
                    <Button variant='contained' className='GreenButton' onClick={handleEditTodo}>
                        Save
                    </Button>
                    <Button variant='contained' className='RedButton' onClick={() => {setEdit(false); setEditContent(content)}}>
                        Cancel
                    </Button>
                </div>  
            </div> : <div className='TodoContent'>
                <span>{content}</span>
                <div>
                    <Button variant='contained' className='BlueButton' onClick={() => setEdit(true)}>
                        Edit
                    </Button>
                    <Button variant='contained'className='RedButton' onClick={handleDeleteTodo}>
                        Delete
                    </Button>
                </div>
            </div>}  

            <Error openError={openError} message={errorMsg}>
                <Button className='ErrorClose' onClick={handleCloseError}>Close</Button>
            </Error>
        </div>
    )
}

export default Todo;
  