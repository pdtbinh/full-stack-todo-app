import { FecthDataParams } from "../types/types"

export const backendURL = 'http://localhost:3000'

export const fetchData = async ({ url, method, body} : FecthDataParams) => {
    const response = await fetch(
        url, 
        {
            method,
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : null
        }
    )
    return response
}