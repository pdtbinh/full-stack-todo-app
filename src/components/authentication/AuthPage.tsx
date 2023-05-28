import React, { useEffect } from 'react'
import Login from './Login';
import Register from './Register';
import { useNavigate } from 'react-router-dom';
import { AuthPageProps } from '../../types/types';
import { Grid } from '@mui/material';

const AuthPage: React.FC<AuthPageProps> = ({ authenticateUser, user }) => {

    const navigate = useNavigate()
    useEffect(
        () => { if (user) navigate('/') }, 
        [authenticateUser, navigate, user]
    )

    return (
      <Grid className='GridContainer' container spacing={2}>
        <Grid className='GridItem' item xs={12} md={5}>
          <Login authenticateUser={authenticateUser}/>
        </Grid>
        <Grid className='GridItem' item xs={12} md={1}>
          <h2>OR</h2>
        </Grid>
        <Grid className='GridItem' item xs={12} md={5}>
          <Register authenticateUser={authenticateUser}/>
        </Grid>
      </Grid>
    );
};
  
export default AuthPage