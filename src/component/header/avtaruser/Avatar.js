// Trong component Avatar.jsx
import React, { useState, useEffect } from "react";
import "./Avatar.css"; // Đảm bảo import CSS
import { Icon } from "react-materialize";
import { Link } from "react-router-dom";

const Avatar = () => {
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpen(false);
    window.location.reload();
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  
  return (
    <div className="avatar-dropdown">
      <div className="avatar">
        <img
          src="./assets/image/no-avatar.webp"
          alt="User Avatar"
          onClick={() => setOpen(!open)}
        />
      </div>
      {isLoggedIn && (
        <>
          {open && (
            <div className="dropdown">
              <ul>
                <Link to={`/profile`} style={{ color: "black" }}>
                  <li>
                    <Icon>portrait</Icon>Profile
                  </li>
                </Link>
                <li onClick={handleLogout}>
                  <Icon>logout</Icon>Logout
                </li>
              </ul>
            </div>
          )}{" "}
        </>
      )}
    </div>
  );
};

export default Avatar;
