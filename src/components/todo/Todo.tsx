import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

type TodoProps = {
    user: any
}

type ItemProps = {
    id: number
    userID: number
    content: string
    editTodo: any
    deleteTodo: any
}

const Todo: React.FC<TodoProps> = ({ user }) => {

    const navigate = useNavigate()
    const [todo, setTodo] = useState<any>([])
    const [content, setContent] = useState<string>('')
    const [addingTodo, setAddingTodo] = useState<boolean>(false)

    const fetchTodo = async () => {
        if (user) {
            const data = await fetch('http://localhost:3000/todo', {
                method: 'get',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            
            const todo = await data.json()

            console.log('GET ALL', todo)

            if (todo) {
                setTodo(todo)
            }
        } else {
            navigate('/login')
        }      
    }
    useEffect(() => {fetchTodo()}, [])

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value)
    }

    const handleAddTodo = async () => {
        const data = await fetch('http://localhost:3000/todo', {
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: user.id, content: content
            }),
        });

        const rows = await data.json()

        console.log('AFTER ADDING', todo)
        if (rows) {
            setTodo(rows)
        }
        setContent('')
        setAddingTodo(false)
    }

    const editTodo = (id: number, editContent: string) => {
        const todoCopy = [ ...todo ]
        const index = todoCopy.findIndex(el => el.id === id)
        todoCopy[index] = { ...todoCopy[index], content: editContent }
        setTodo(todoCopy) 
    }

    const deleteTodo = (id: number) => {
        setTodo(todo.filter((el: any) => el.id !== id)) 
    }

    return (
      <div>
        { todo.map((item: any) => <Item id={item.id} userID={item.user_id} key={item.id} content={ item.content } editTodo={editTodo} deleteTodo={deleteTodo}/>) }
        {
            addingTodo ? <div>
                <input value={content} onChange={handleContentChange} />
                <button onClick={handleAddTodo}>Add</button>
                <button onClick={() => setAddingTodo(false)}>Cancel</button>
            </div> : null
        }
        { !addingTodo ? <button onClick={() => setAddingTodo(true)}>Add todo</button> : null }
      </div>
    );
};

const Item: React.FC<ItemProps> = ({ id, userID, content, editTodo, deleteTodo }) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editContent, setEditContent] = useState<string>(content)

    console.log('RENDER: ', content)
    useEffect(() => console.log('USESTATE RENDER: ', content))

    const handleEditContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditContent(e.target.value)
    }

    const handleEditTodo = async () => {
        const response = await fetch(`http://localhost:3000/todo/${id}`, {
            method: 'put',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userID, editContent
            }),
        });

        if (response.status === 200) {
            editTodo(id, editContent)
        }
        setEdit(false)
    }

    const handleDeleteTodo = async () => {
        const response = await fetch(`http://localhost:3000/todo/${id}`, {
            method: 'delete',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userID
            }),
        });
        
        if (response.status === 204) {
            deleteTodo(id)
        }
    }

    return (
        <div>
            { 
                edit ? <div>
                    <input type="text" value={editContent} onChange={handleEditContentChange} /> 
                    <button onClick={handleEditTodo}>Save</button>
                    <button onClick={() => {setEdit(false); setEditContent(content)}}>Cancel</button>
                </div>
                : content
            }
            <button onClick={() => setEdit(true)}>Edit</button>
            <button onClick={handleDeleteTodo}>Delete</button>
        </div>
    )
}

export default Todo;
  