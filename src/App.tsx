import './App.css';
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './components/login/Login';
import Todo from './components/todo/Todo';

const App: React.FC = () => {
  const [user, setUser] = useState<any | null>(null)

  const login = (loggedUser: any) => setUser(loggedUser)

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage login={login} user={user}/>}/>
          <Route path="/" element={<Todo user={user}/>}/>
          <Route path="*" element={null}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
