import React, { useState } from 'react'
import './Login.css'
import GoogleLogin from 'react-google-login'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to the API endpoint
      const response = await axios.post(
        "https://localhost:44306/api/Auth/login",
        { username, password } // Send the username and password in the request body
      );
      console.log(response.data);
      // If login is successful, redirect to the main page
      window.location.href = "/mainController";
    } catch (error) {
      // Handle errors
      console.error("An error occurred while sending the API request:", error.message);
    }
  };
  const responseGoogle = (response) => {
    console.log(response);
  };
  return (
    <>
      <div className="regisPage">
        <div class="overlay"></div>
        <div class="login">
          <div className="logoLogin">
            <img src="./assets/image/logo.png" alt=""></img>
          </div>
          <div className="title">Welcome to Artwork!</div>
          <h6>please login to your account</h6>
          <form action="mainController">
            <div className="group">
              <input type="text" placeholder="Usename" />
            </div>
            <div className="group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className='recovery'>
              <Link to="/recovery-password">Recover Password?</Link>
            </div>
            <div className="signIn">
              <button type="submit">Login</button>
            </div>
            <div className='Or'>
              <a>Or continue with</a>
            </div>
            <GoogleLogin
              clientId="YOUR_GOOGLE_CLIENT_ID"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <div className='signUp'>
              <h6>Don't have an account?</h6>
              <Link to={`regis`}><button>Sign UP</button></Link>
            </div>
          </form>
        </div>
      </div>
    </>

  )
}