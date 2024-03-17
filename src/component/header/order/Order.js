import axios from "axios";
import "./Order.css";
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "react-materialize";
import urlApi from "../../../configAPI/UrlApi";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const [open, setOpen] = useState(false);
  const avatarRef = useRef(null);
  const urlNoAva =
    "https://firebasestorage.googleapis.com/v0/b/artwork-platform.appspot.com/o/logo%2F499638df-cf1c-4ee7-9abf-fb51e875e6dc?alt=media&token=367643f5-8904-4be8-97a0-a794e6b76bd0";

  const handleOutsideClick = (event) => {
    if (avatarRef.current && !avatarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const [hasData, setHasData] = useState(false);
  const [order, setOrder] = useState([]);
  const token = localStorage.getItem("token");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (token) {
      axios
        .get(`${urlApi}/api/RequestOrder/get-mine-order`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (Array.isArray(response.data)) {
            setHasData(true);
            setOrder(response.data);
            const unreadCount = response.data.filter(
              (note) => !note.isRead
            ).length;
            setUnreadCount(unreadCount);
          } else {
            // Nếu response.data không phải là mảng, xử lý tương ứng
            console.error("Dữ liệu trả về không phải là mảng");
          }
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error("Lỗi khi gọi API:", error);
        });
    }
  }, []);

  useEffect(() => {
    const storedUnreadCount = localStorage.getItem("unreadCount");
    if (storedUnreadCount) {
      setUnreadCount(parseInt(storedUnreadCount));
    }
  }, []);

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
          localStorage.setItem("user", JSON.stringify(userInfo));
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

  const [selectedNotes, setSelectedNotes] = useState([]);
  const navigate = useNavigate();
  const handleNoteClick = (note) => {
    setUnreadCount(unreadCount - 1);
    localStorage.setItem("unreadCount", unreadCount - 1);
    setSelectedNotes([...selectedNotes, note.id]);
    navigate(`/profile/mylog/${note.id}`);
  };

  useEffect(() => {
    const storedUnreadCount = localStorage.getItem("unreadCount");
    if (storedUnreadCount) {
      setUnreadCount(parseInt(storedUnreadCount));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("unreadCount", unreadCount); // Lưu giá trị `unreadCount` vào Local Storage mỗi khi nó thay đổi
  }, [unreadCount]);

  function formatTimeAgo(createdAt) {
    const timeDifference = new Date() - new Date(createdAt);
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    return `${hours} hours ago`;
  }
  return (
    <div className="order-dropdown" ref={avatarRef}>
      <div className="order" onClick={() => setOpen(!open)}>
        <Icon style={{ width: "100%", fontSize: "30px" }}>
          notificationsactive
        </Icon>
        {unreadCount > 0 && <div className="badge">{unreadCount}</div>}
      </div>
      {isLoggedIn && (
        <>
          {open && (
            <ul className="dropdown">
              <React.Fragment>
                {hasData && order.length > 0 ? (
                  <>
                    {order.map((note) => (
                      <li
                        key={note.id}
                        id="li2"
                        className={`liOrder ${
                          selectedNotes.includes(note.id) ? "selected" : ""
                        }`}
                        onClick={() => handleNoteClick(note)}
                      >
                        <div id="div1">
                          <section style={{ display: "flex" }}>
                            <img
                              src={urlNoAva}
                              alt=""
                              style={{ marginTop: "12px" }}
                            />
                            <div style={{ marginLeft: "15px" }}>
                              <div style={{ textAlign: "left" }}>
                                {formatTimeAgo(note.createdAt)}
                              </div>
                              <div style={{ textAlign: "left" }}>
                                From: <strong>{note.fullName_Sender}</strong>
                              </div>
                            </div>
                          </section>
                          <section>
                            <p
                              style={{ textAlign: "left", maxWidth: "357.3px" }}
                            >
                              {note.text}
                            </p>
                          </section>
                        </div>
                      </li>
                    ))}
                  </>
                ) : (
                  <li id="li1">
                    <span>Your Unread Notes</span>
                  </li>
                )}
              </React.Fragment>
            </ul>
          )}
        </>
      )}
    </div>
  );
}
