import React, { useState } from "react";
import "./Login.css";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    const data = {
      UserName: username,
      Password: password,
    };
    event.preventDefault();
    try {
      // Send a POST request to the API endpoint
      const response = await axios.post(
        "https://localhost:44306/api/Auth/login",
        data // Send the username and password in the request body
      );
      // If login is successful, redirect to the main page
      const { newToken } = response.data 

      // Lưu trữ token trong localStorage (hoặc sessionStorage) để sử dụng sau này
      localStorage.setItem('token', newToken);

      axios.defaults.headers.common['Authorize'] = `Bearer ${newToken}`;
      window.location.href = "/";
      console.log(newToken);
      console.log(response.data);
      console.log(data);
      alert("Login Successful!")
    } catch (error) {
      // Handle errors
      alert("Username or password is wrong. Please try again!");
      console.log(data);
    }
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <>
      <div className="regisPage">
        <div className="overlay"></div>
        <div className="login">
          <div className="logoLogin">
            <img src="./assets/image/logo.png" alt=""></img>
          </div>
          <div className="title">Welcome to Artwork!</div>
          <h6>please login to your account</h6>
          <form onSubmit={handleSubmit}>
            <div className="group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="recovery">
              <Link to="/recovery-password">Recover Password?</Link>
            </div>
            <div className="signIn">
              <button type="submit">Login</button>
            </div>
            <div className="Or">
              <span>Or continue with</span>
            </div>

            <GoogleLogin
              clientId="YOUR_GOOGLE_CLIENT_ID"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />

            <div className="signUp">
              <h6>Don't have an account?</h6>
              <Link to={`/regis`}>
                <button>Sign UP</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
