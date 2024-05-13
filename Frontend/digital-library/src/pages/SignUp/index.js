import React, { useEffect, useState } from 'react';
import './styles.css';
import favicon_logo from '../../assets/favicon.png'
import { Link } from 'react-router-dom';
import { getUserData, saveUserData, signInAPI } from '../../action/API/setup';
import { getIdUserByUsername, insertUser } from '../../action/API/user';
import { navigationTo } from '../../action/constant/function';

function SignUp() {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('');
    const [cellPhone, setCellPhone] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
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

        document.title = 'Sign up - IPB Library Digital';
    }


    const handleSignIn = () => {
        const user = {
            id: "123",
            num_student: "S123456",
            name: "João",
            email: "joao@example.com",
            cell_phone: "123456789",
            password: "senha123"
          };
          
          // Chame a função insertUser e trate a promessa retornada
          insertUser(user)
            .then(response => {
                if(response === null){

                } else if (response === false){

                } else {

                }
            })
        /* signInAPI(username, password).then((res) => {
        setError("Res: " + res)
        if(res === true){
            setError('Valid signin')
            getIdUserByUsername(username)
            .then((user) => {
                console.log(user)
                saveUserData(user)
                window.location.href='/home'
            })

        } else {
            setError('Invalid username or password')
        }
        }).catch((res) => {
            setError("Res" + res)
        }) */

    };


  return (
    <div className="container">
      <div className="card-sign-in">
        <div className="card-sign-in-top">
   
        </div>
        <div className="card-content">
            <div className="input-container">
                <label htmlFor="name">Name</label>
                <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
          </div>
          <div className="input-container">  
            <label htmlFor="username">Username or Email</label>
            <input
              type="email"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">  
            <label htmlFor="cellPhone">Cell phone</label>
            <input
              type="tel"
              id="cellPhone"
              value={cellPhone}
              onChange={(e) => setCellPhone(e.target.value)}
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
          <div className="input-container">
            <label htmlFor="password">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <p className="error-message">{error}</p>
          <button className="sign-in-button" onClick={handleSignIn}>
            Sign up
          </button>
          <button className="sign-un-button" onClick={() => navigationTo('signin', false)}>
            Sign in
          </button>
          
          <Link to='https://myconfig.ccom.ipb.pt/conta/activate/'><p className="forgot-password">Forgot the password?</p></Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
