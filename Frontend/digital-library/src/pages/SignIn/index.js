import React, { useEffect, useState } from 'react';
import './styles.css';
import favicon_logo from '../../assets/favicon.png'
import { Link } from 'react-router-dom';
import { getUserData, saveUserData, signInAPI } from '../../action/API/setup';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const res = getUserData()
    if(res !== null){
      window.location.href='/home'
      return
    }
    configPage()
  }, [])

  const configPage = () => {
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = favicon_logo;

    document.title = 'Sign in - IPB Library Digital';
  }


  const handleSignIn = () => {
    signInAPI(username, password).then((res) => {
      setError("Res:" + res)
      if(res === true){
        setError('Valid signin')
        saveUserData(username)
        window.location.href='/home'
      } else {
        setError('Invalid username or password')
      }
    }).catch((res) => {
      setError("Res" +res)
    })

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
