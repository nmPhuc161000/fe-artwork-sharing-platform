import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import  SearchBar  from "./search/searchbar/SearchBar";
import Avatar from "./avtaruser/Avatar";
import SortButton from "./sortbutton/SortButton";

export default function Header() {
  // const [results, setResults] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <div className="nav">
        <div className="navbar">
          <div className="search">
            <SearchBar  />        
          </div>
          <div className="logo">
            <Link to={`/`}>
              <img src="./assets/image/logo.png" alt="Logo" />
            </Link>
          </div>
          <SortButton /> {/* Đặt SortButton ở vị trí bạn muốn trong thanh header */}
          <div className="regisLogin">
            {isLoggedIn && (
              <>
                <Link to={`/login`}>
                  <button>Login</button>
                </Link>
                <Link to={`/regis`}>
                  <button>Register</button>
                </Link>
              </>
            )}
            <Avatar />
          </div>
        </div>
      </div>
    </>
  );
}