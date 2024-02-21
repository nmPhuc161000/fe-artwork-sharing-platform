import React from "react";
import "./Register.css";

export default function Register() {
  return (
    <>
      <div className="regisPage">
      <div class="overlay"></div>
        <div class="register">
          <div className="logoLogin">
            <img src="./assets/image/logo.png" alt=""></img>
          </div>
          <div className="title">Register Now</div>
          <form action="mainController">
            <div className="group">
              <input type="text" placeholder="Fullname" />
            </div>
            <div className="group">
              <input type="text" placeholder="Email" />
            </div>
            <div className="group">
              <input type="text" placeholder="Username" />
            </div>
            <div className="group">
              <input type="password" placeholder="Password" />
            </div>
            <div className="group">
              <input type="password" placeholder="Retype Password" />
            </div>
            <div className="signUp">
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
