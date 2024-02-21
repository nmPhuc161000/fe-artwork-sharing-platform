import React from 'react'
import './Login.css'
import GoogleLogin from 'react-google-login'
export default function Login() {
  const responseGoogle = (response) => {
    console.log(response);
  };

  const responseFacebook = (response) => {
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
          <h4>please login to your accout</h4>
          <form action="mainController">
            <div className="group">
              <input type="text" placeholder="Usename" />
            </div>
            <div className="group">
              <input type="text" placeholder="Password" />
            </div>
            <div className='recovery'>
            <button type="submit">Recovery password ???</button>
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
            <h4>Don't have an account?</h4>
            <button type="submit">Sign UP</button>
            </div>
          </form>
        </div>
      </div>
    </>

  )
}
