import React from "react";
import { Icon, Button } from "react-materialize";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <>
      <div className="nav">
        <div className="navbar">
          <div className="search">
            <Icon>search</Icon>
            <input placeholder="Search" type="text" />
          </div>
          <div className="logo">
            <Link to={`/`}>
              <img src="./assets/image/logo.png" alt="" />
            </Link>
          </div>
          <div className="regisLogin">
            <Link to={`login`}>
              <button>Login</button>
            </Link>
            <Link to={`regis`}>
              <button>Register</button>
            </Link>
            <Link to={`regis`}>
              <img src="./assets/image/no-avatar.webp" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
