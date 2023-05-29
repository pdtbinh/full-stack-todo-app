import React, { useEffect, useState } from 'react'
import { LoginProps, User } from '../../types/types'
import { backendURL, fetchData } from '../../utils/utils'
import './authStyle.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Error from '../error/Error'
import '../error/errorStyle.css'

const Login: React.FC<LoginProps> = ({ authenticateUser }) => {

  const [email, setEmail] = useState<string>('')

  const [password, setPassword] = useState<string>('')

  const [openError, setOpenError] = useState<boolean>(false)

  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      const response = await fetchData(
        { url: `${backendURL}/login`, method: 'post', body: { email, password } }
      )
      const user = await response.json()
      if (user?.id) {
        authenticateUser(user)
      } else {
        setOpenError(true)
        setErrorMsg('Internal server error. Please reload and try again.')
      }
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
    <form onSubmit={handleSubmit}>
      <h1>LOGIN</h1>
      <div className='TextGroup'>
        <div>
          <TextField required label='Email' type="search" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <TextField autoFocus required label='Password' type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
      </div>
      <Button variant='contained' type="submit">Login</Button>

      <Error openError={openError} message={errorMsg}>
        <Button className='ErrorClose' onClick={handleCloseError}>Close</Button>
      </Error>
    </form>
  );
};

export default Login
