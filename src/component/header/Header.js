import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { SearchBar } from "./search/searchbar/SearchBar";
import { SearchList } from "./search/searchlist/SearchList";
import Avatar from "./avtaruser/Avatar";

export default function Header() {
  const [results, setResults] = useState([]);

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
            <SearchBar setResults={setResults} />
            <SearchList results={results} />
          </div>
          <div className="logo">
            <Link to={`/`}>
              <img src="./assets/image/logo.png" alt="" />
            </Link>
          </div>
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
