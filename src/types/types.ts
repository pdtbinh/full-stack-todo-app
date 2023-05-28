export type RegisterRequestBody = {
    fullname: string
    email: string
    password: string
}

export type User = {
    id: number
    fullname: string
    email: string
    password: string
}

export type Todo = {
    id: number
    user_id: number
    content: string
}