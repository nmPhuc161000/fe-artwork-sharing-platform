import React, { useState, useEffect, useRef } from "react";
import "./Avatar.css";
import urlApi from "../../configAPI/UrlApi";
import { Icon } from "react-materialize";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Avatar = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState([]);
  const avatarRef = useRef(null);
  const urlNoAva =
    "https://firebasestorage.googleapis.com/v0/b/artwork-platform.appspot.com/o/logo%2F499638df-cf1c-4ee7-9abf-fb51e875e6dc?alt=media&token=367643f5-8904-4be8-97a0-a794e6b76bd0";

    const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpen(false);
    navigate("/");
    window.location.reload();
    
  };

  const handleProfileClick = () => {
    setOpen(false);
    // Thực hiện chuyển hướng đến trang profile
  };
  const handlePasswordChange = () => {
    setOpen(false);
    // Thực hiện chuyển hướng đến trang thay đổi mật khẩu
  };
  const handleOutsideClick = (event) => {
    if (avatarRef.current && !avatarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const data = {
      Token: token,
    };
    if (token) {
      setIsLoggedIn(true);
      axios
        .post(`${urlApi}/api/Auth/me`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {

          const userInfo = response.data.userInfo;
          localStorage.setItem('user', JSON.stringify(userInfo))

          setUsername(userInfo.fullName);
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error("Lỗi khi gọi API:", error);
        });
    }
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="avatar-dropdown" ref={avatarRef}style={{marginRight: "50px"}}>
      <div className="avatar" >
        <img src={urlNoAva} alt="User Avatar" onClick={() => setOpen(!open)} />
      </div>
      {isLoggedIn && (
        <>
          {open && (
            <div className="dropdown">
              <div className="userName" style={{ textAlign: "left" }}>
                <span style={{ fontWeight: "bold", margin: "0 10px" }}>
                  {username}
                </span>
              </div>
              <ul>
                <li></li>
                <Link
                  to={`/profile/shop`}
                  style={{ color: "black" }}
                  onClick={handleProfileClick}
                >
                  <li>
                    <Icon>portrait</Icon>Profile
                  </li>
                </Link>
                <Link
                  to={`/changepassword`}
                  style={{ color: "black" }}
                  onClick={handlePasswordChange}
                >
                  <li>
                    <Icon>lock</Icon>Change Password
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
