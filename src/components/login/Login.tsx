import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

type LoginPageProps = {
  login: any
  user: any
}

type LoginProps = {
  login: any
}

type RegisterProps = {
  login: any
}

const LoginPage: React.FC<LoginPageProps> = ({ login, user }) => {

  const navigate = useNavigate()

  useEffect(() => {
    if (user)
      navigate('/')
  })

  return (
    <div>
      <Login login={login}/>
      <Register login={login}/>
    </div>
  );
};

const Register: React.FC<RegisterProps> = ({ login }) => {

  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullname(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response: any = await axios.post(
      'http://localhost:3000/register', 
      { fullname, email, password }, 
      { withCredentials: true }
    )
    const data = response.data
    if (data.fullname) {
      login(data)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullname">Full name:</label>
        <input type="fullname" id="fullname" value={fullname} onChange={handleFullnameChange} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};


const Login: React.FC<LoginProps> = ({ login }) => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('uubsbusbusbsu')

    const data = await fetch('http://localhost:3000/login', {
        method: 'post',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, password
        }),
    });

    // const response: any = await axios.post(
    //   'http://localhost:3000/login', 
    //   { email, password }, 
    //   { 
    //     withCredentials: true,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // Add any other headers you need
    //     }
    //   }
    // )

    const user = await data.json()

    console.log(user)

    if (user) {
      login(user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage
