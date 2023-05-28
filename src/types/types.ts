export type User = {
    id: number
    fullname: string
    email: string
    password: string
}

export type AuthPageProps = {
    authenticateUser: any
    user: any
}
  
export type LoginProps = {
    authenticateUser: any
}

export type RegisterProps = {
    authenticateUser: any
}

export type TodoProps = {
    id: number
    userID: number
    content: string
    editTodo: any
    deleteTodo: any
}

export type TodosProps = {
    user: any
    logUserOut: any
}

export type ErrorProps = {
    message: string
    openError: boolean
    children: any
}

export type FecthDataParams = {
    url: string
    method: string
    body: any
}