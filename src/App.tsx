import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthPage from './components/authentication/AuthPage';
import { User } from './types/types';
import Todos from './components/todo/Todos';
import { backendURL, fetchData } from './utils/utils';
import NotFound from './components/notfound/NotFound';

const App: React.FC = () => {

  const [user, setUser] = useState<User | null>(null)

  const authenticateUser = (loggedUser: any) => setUser(loggedUser)

  const logUserOut = () => setUser(null)

  const fetchUser = async () => {
    const response = await fetchData(
      { url: `${backendURL}`, method: 'get', body: null }
    )
    const user = await response.json()
    if (!user?.error) {
      authenticateUser(user)
    }
  }
  useEffect(() => {fetchUser()}, [])

  return (
    <Router>
      <div className="App">
        <h1>Todo App</h1>
        <Routes>
          <Route path="/login" element={<AuthPage authenticateUser={authenticateUser} user={user}/>}/>
          <Route path="/" element={<Todos logUserOut={logUserOut} user={user}/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
