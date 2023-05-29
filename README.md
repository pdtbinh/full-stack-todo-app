This is the backend of Todo App. 
The backend handles authentication and sending response for request.

Backend is hosted on: https://perntodo.herokuapp.com

All routes:

`GET /`: Send user info

`GET /todos`: Send todos owned by authenticated user
`POST /todos`: Create todo
`PUT /todos/:id`: Edit todo
`DELETE /todo/:id`: Delete todo

`POST /login`: Login user
`POST /register`: Register new user

Folder structure:
```
src
|-authentication
|-controllers
|-
```
