import React from 'react'
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {

    return (
      <div>
        <h1>404: Page Not found</h1>
        <p>Sorry, we could not find what you are looking for :(</p>
        <p>Click below to redirect to:</p>
        <Link to='/'>Your todo list</Link>
      </div>
    );
};
  
export default NotFound