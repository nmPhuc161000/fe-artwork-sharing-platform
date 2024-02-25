import React, { useState } from "react";
import { Icon } from "react-materialize";
import { Link } from "react-router-dom";
import "./Header.css";
import { SearchBar } from "./search/searchbar/SearchBar";
import { SearchList } from "./search/searchlist/SearchList";

export default function Header() {
  const [results, setResults] = useState([]);

  return (
    <>
      <div className="nav">
        <div className="navbar">
          <div className="search">
            <SearchBar setResults={setResults}/>
            <SearchList results={results}/>
          </div>
          <div className="logo">
            <Link to={`/`}>
              <img src="./assets/image/logo.png" alt="" />
            </Link>
          </div>
          <div className="regisLogin">
            <Link to={`/login`}>
              <button>Login</button>
            </Link>
            <Link to={`/regis`}>
              <button>Register</button>
            </Link>
            <Link to={`/regis`}>
              <img src="./assets/image/no-avatar.webp" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
