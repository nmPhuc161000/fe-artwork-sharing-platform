import React, { useEffect, useState } from "react";
import "./Request.css";
import urlApi from "../../configAPI/UrlApi";
import axios from "axios";

export default function Request({ usedById }) {
  const [username, setUsername] = useState([]);
  const [currentTab, setCurrentTab] = useState("unread");
  const [mail, setMail] = useState("newRequest");
  const [email, setEmail] = useState(username.email || "");
  const [phoneNo, setPhoneNo] = useState(username.phoneNumber || "");
  const [categoryArt, setCategoryArt] = useState("");
  const [text, setText] = useState("");
  const [hasData, setHasData] = useState(false);
  const token = localStorage.getItem("token");

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  const handleNewRequest = (tab) => {
    setMail(tab);
  };

  const handleEmail = (value) => {
    setEmail(value);
  };

  const handlePhoneNo = (value) => {
    setPhoneNo(value);
  };

  const handleCategoryArt = (value) => {
    setCategoryArt(value);
  };

  const handleText = (value) => {
    setText(value);
  };

  const dataSend = {
    email: email,
    phoneNumber: phoneNo,
    category_Artwork: categoryArt,
    text: text,
  };

  const handleSend = async () => {
    try {
      const response = await axios.post(
        `${urlApi}/api/RequestOrder/send-request?user_Id=${usedById.user_Id}`,
        dataSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      if (response.status === 200) {
        alert("Send successful!");
        handleNewRequest("notMail")
      } else {
        console.error(
          "Failed to send. Server responded with status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    const data = {
      Token: token,
    };
    if (token) {
      axios
        .post(`${urlApi}/api/Auth/me`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // Xử lý dữ liệu trả về từ API
          const userInfo = response.data.userInfo;

          // Lấy userName từ thông tin người dùng
          setUsername(userInfo);
          setEmail(userInfo.email || "");
          setPhoneNo(userInfo.phoneNumber || "");
          setText("");

          // Sử dụng userName theo nhu cầu của bạn
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error("Lỗi khi gọi API:", error);
        });
    }
  }, []);

  return (
    <div className="request">
      <section className="request-content">
        <section className="conten-title">
          <span>Request</span>
          <div style={{ marginRight: "28px" }}>
            <button
              onClick={() => handleNewRequest("newRequest")}
              className={currentTab === "newRequest" ? "notMail" : ""}
            >
              New request
            </button>
          </div>
        </section>
        <section className="content-box">
          <div className="box-sideBar">
            <button
              onClick={() => handleTabClick("unread")}
              className={currentTab === "unread" ? "active" : ""}
            >
              Unread
            </button>
            <button
              onClick={() => handleTabClick("sent")}
              className={currentTab === "sent" ? "active" : ""}
            >
              Sent
            </button>
          </div>
          <div className="box-request">
            <ul>
              {currentTab === "unread" ? (
                <React.Fragment>
                  {hasData ? (
                    // Hiển thị thẻ li thứ nhất nếu có dữ liệu
                    <li>
                      <span>Your Unread Notes</span>
                    </li>
                  ) : (
                    // Hiển thị thẻ li thứ hai nếu không có dữ liệu
                    <li>
                      <span>No Unread Notes</span>
                    </li>
                  )}
                  {/* Thêm thẻ li thứ hai ở đây nếu có dữ liệu */}
                  {hasData && (
                    <li>
                      <span>Your Second Note</span>
                    </li>
                  )}
                </React.Fragment>
              ) : (
                <li>
                  <span>No Sent Notes</span>
                </li>
              )}
            </ul>
            <div>
              {mail === "newRequest" ? (
                <div className="boxRequest-mail">
                  <section style={{ width: "90%", height: "90%" }}>
                    <section>
                      <input
                        placeholder="To"
                        type="text"
                        value={usedById.full_Name}
                      />

                      <input
                        type="text"
                        value={email}
                        onChange={(e) => handleEmail(e.target.value)}
                      />

                      <input
                        type="text"
                        value={phoneNo}
                        onChange={(e) => handlePhoneNo(e.target.value)}
                      />

                      <input
                        type="text"
                        onChange={(e) => handleCategoryArt(e.target.value)}
                      />
                      <textarea
                        placeholder="What's on your mind?"
                        onChange={(e) => handleText(e.target.value)}
                      />
                    </section>
                    <section style={{ textAlign: "right" }}>
                      <button
                        onClick={() => handleNewRequest("notMail")}
                        className={currentTab === "newRequest" ? "notMail" : ""}
                        style={{
                          border: "none",
                          fontWeight: "bold",
                          color: "#b1b1b9",
                          width: "120px",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          height: "51px",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "black";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "#b1b1b9";
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(e) => handleSend(e)}
                        style={{
                          marginLeft: "10px",
                          border: "none",
                          backgroundColor: "#05eb8f",
                          width: "120px",
                          height: "51px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        SEND
                      </button>
                    </section>
                  </section>
                </div>
              ) : (
                <div className="boxRequest-notMail"></div>
              )}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
