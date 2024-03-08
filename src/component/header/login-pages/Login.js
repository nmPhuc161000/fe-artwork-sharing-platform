import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from 'react-materialize';
import axios from 'axios';

export default function Login() {
  const urlLogo = "https://firebasestorage.googleapis.com/v0/b/artwork-platform.appspot.com/o/logo%2Ffeed6075-55fd-4fb3-98d4-946d30029eda?alt=media&token=a3dd9363-73f3-4aec-ae32-264c761a0c0f";
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44306/api/Auth/login",
        { username, password }
      );
      console.log(response.data);
      console.log(response.data.userInfo.roles);
      if(response.data.userInfo.roles === 'ADMIN'){
        navigate('/home-admin');
      } else if (response.data.userInfo.roles.includes('CREATOR') || response.data.userInfo.roles.includes('CUSTOMER')) {
        window.location.href = "/";
    }
      const { newToken } = response.data;
      localStorage.setItem('token', newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      alert("Login successful");
      
    } catch (error) {
      alert("Login fail! Please re-enter!!!");
      console.error("An error occurred while sending the API request:", error.message);
      setLoginError(true);
    }
  };

  return (
    <div className="loginPage">
      <div className="login">
        <div className="logoLogin">
        <Link to={`/`}>
            <img src={urlLogo} alt="Logo" />
          </Link>
        </div>
        <div className="title">Welcome to Artwork!</div>
        <h6>please login to your account</h6>
        <form onSubmit={handleSubmit}>
          <div className="group">
            <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              <Icon className="toggle-password-icon">{showPassword ? 'visibility_off' : 'visibility'}</Icon>
            </button>
          </div>
          <div className='recovery'>
            <Link to="/recovery-password">Recover Password?</Link>
          </div>
          <div className="signIn">
            <button type="submit">Login</button>
          </div>
          <div className='signUp'>
            <h6>Don't have an account?</h6>
            <Link to={`/regis`}><button>Sign UP</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}