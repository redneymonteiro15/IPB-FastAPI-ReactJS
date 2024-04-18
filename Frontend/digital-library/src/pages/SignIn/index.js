import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = () => {

    if (username === 'usuário_correto' && password === 'senha_correta') {

    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <div className="card-sign-in">
        <div className="card-sign-in-top">
   
        </div>
        <div className="card-content">
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="error-message">{error}</p>
          <button className="sign-in-button" onClick={handleSignIn}>
            Sign In
          </button>
          
          <Link to='https://myconfig.ccom.ipb.pt/conta/activate/'><p className="forgot-password">Forgot the password?</p></Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
