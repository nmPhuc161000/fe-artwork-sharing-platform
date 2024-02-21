import React from "react";
import { Icon, Button } from "react-materialize";
import { Link } from "react-router-dom";
import './Header.css'

export default function Header() {
  return (
    <>
      <div className="navbar">
        <div className="search">
          <Icon>search</Icon>
          <input placeholder="Search"/>
        </div>
        <div className="logo">
          <Link to={`home`}><img src="./assets/image/logo.png" alt=""/></Link>
        </div>
        <div className="">
          <Link to={`login`}><Button>Login</Button></Link>
          <Link to={`regis`}><Button>Register</Button></Link>
        </div>
      </div>
    </>
  );
}
