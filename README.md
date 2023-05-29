This is the backend of Todo App. 
The backend handles authentication (with Passport) and sending responses for requests.

Backend is hosted on: https://perntodo.herokuapp.com

All routes:

`GET /`: Send user info

`GET /todos`: Send todos owned by authenticated user
`POST /todos`: Create todo
`PUT /todos/:id`: Edit todo
`DELETE /todo/:id`: Delete todo

`POST /login`: Login user
`POST /register`: Register new user

Some info on .src children folders:

.src
├── index.ts
├── authentication: Configure Passport
├── db: Configure database connections
├── controllers: Functions for handling requests
├── routes: Grouping routes
├── types: Some Typescript types
├── utils: Helper, wrapper (catch error) functions

