import React, { useState } from 'react'
import { RegisterProps } from '../../types/types';
import { backendURL, fetchData } from '../../utils/utils';
import { User } from '../../types/types';
import './authStyle.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Error from '../error/Error'
import '../error/errorStyle.css'


const Register: React.FC<RegisterProps> = ({ authenticateUser }) => {

    const [fullname, setFullname] = useState<string>('');

    const [email, setEmail] = useState<string>('');

    const [password, setPassword] = useState<string>('');

    const [openError, setOpenError] = useState<boolean>(false)

    const [errorMsg, setErrorMsg] = useState<string>('')
  
    const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFullname(e.target.value)
  
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  
    const handleSubmit = async (e: React.FormEvent) => {
      try {
        e.preventDefault();
        const response = await fetchData(
            { url: `${backendURL}/register`, method: 'post', body: { fullname, email, password } }
        )
        const user = await response.json()
        console.log('After registration: ', user)
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
        <h1>REGISTER</h1>
        <div className='TextGroup'>
          <div>
            <TextField required label='Full Name' type="fullname" id="fullname" value={fullname} onChange={handleFullnameChange} />
          </div>
          <div>
            <TextField required label='Email' type="email" id="email" value={email} onChange={handleEmailChange} />
          </div>
          <div>
            <TextField required label='Password' type="password" id="password" value={password} onChange={handlePasswordChange} />
          </div>
        </div>
        <Button variant='contained' type="submit">Register</Button>

        <Error openError={openError} message={errorMsg}>
          <Button className='ErrorClose' onClick={handleCloseError}>Close</Button>
        </Error>
      </form>
    );
};

export default Register


  