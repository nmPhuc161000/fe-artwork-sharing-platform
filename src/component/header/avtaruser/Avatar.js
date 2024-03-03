import React, { useState, useEffect, useRef } from "react";
import "./Avatar.css";
import { Icon } from "react-materialize";
import { Link } from "react-router-dom";
import axios from "axios";

const Avatar = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState([]);
  const avatarRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpen(false);
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
        .post("https://localhost:44306/api/Auth/me", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // Xử lý dữ liệu trả về từ API
          const userInfo = response.data.userInfo;

          // Lấy userName từ thông tin người dùng
          setUsername(userInfo.fullName);

          // Sử dụng userName theo nhu cầu của bạn
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
    <div className="avatar-dropdown" ref={avatarRef}>
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
              <strong>{username}</strong>
              <ul>
                <li></li>
                <Link
                  to={`/profile`}
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
