import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Icon, Modal, Button, Textarea } from "react-materialize";
import "./Detail.css";
import urlApi from "../configAPI/UrlApi";
import axios from "axios";
import EditArt from "./editArt/EditArt";
import DeleteArt from "./deleteArt/DeleteArt";
import Favourite from "./favourite/Favourite";

export default function Detail() {
  const [comment, setComment] = useState("");
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); // State để điều khiển việc hiển thị modal comment
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const tokenUser = localStorage.getItem("token");
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    // Logic for submitting comment
    console.log("Comment submitted:", comment);
    // Close the modal after submitting comment
    setIsCommentModalOpen(false);
  };

  const toggleFullscreen = () => {
    const imageElement = document.querySelector(".product-tumb img"); // Lấy phần tử ảnh
    if (imageElement) {
      // Kiểm tra xem trình duyệt có hỗ trợ API fullscreen không
      if (imageElement.requestFullscreen) {
        // Nếu fullscreen đang được bật, tắt fullscreen
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          // Nếu fullscreen đang tắt, bật fullscreen cho phần tử ảnh
          imageElement.requestFullscreen();
        }
      } else {
        alert("Your browser does not support fullscreen mode.");
      }
    } else {
      alert("Image element not found.");
    }
  };
  const handleDownloadClick = () => {
    if (isLoggedIn) {
      window.location.href = "/payment";
    } else {
      // Lưu địa chỉ URL của trang chi tiết trước khi chuyển hướng đến trang đăng nhập
      localStorage.setItem("redirectPath", window.location.pathname);
      window.location.href = "/login";
    }
  };

  const [itemData, setItemData] = useState([]);
  const { ID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${urlApi}/api/Artwork/${String(ID)}`
        );
        setItemData(response.data);
        console.log("Data from API: ", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ID]); // Thêm ID vào dependency array để useEffect chạy lại khi ID thay đổi

  const handleAuthorClick = () => {
    if (isLoggedIn) {
      window.location.href = "/profile";
    } else {
      localStorage.setItem("redirectPath", window.location.pathname);
      window.location.href = "/login";
    }
  };
  //call api để xét tên người dùng
  const [userData, setUserData] = useState({});
  const fetchUserData = async () => {
    try {
      const response = await axios.post(
        `${urlApi}/api/Auth/me`,
        {
          token: tokenUser,
        },
        {
          headers: {
            accept: "text/plain",
            "Content-Type": "application/json",
          },
        }
      );
      setUserData(response.data);
      console.log("User data from API: ", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="container-card">
      <div className="product-card">
        <div className="product-tumb">
          <img src={itemData.url_Image} alt="Product" />
        </div>
      </div>
      <div className="product-icons">
        <Favourite itemData={itemData}/>
        <div className="product-comment">
          {/* Clicking on the icon opens the comment modal */}
          <button onClick={() => setIsCommentModalOpen(true)}>
            <Icon>comment</Icon>
            <span>Comment</span>
          </button>
          {/* Modal displayed when isCommentModalOpen state is true */}
          <Modal
            open={isCommentModalOpen}
            actions={[
              <Button onClick={handleCommentSubmit} modal="close" waves="light">
                Submit
              </Button>,
            ]}
            options={{ onCloseEnd: () => setIsCommentModalOpen(false) }} // Khi đóng modal, cập nhật state để đóng modal
          >
            <Textarea
              placeholder="Add your comment here..."
              value={comment}
              onChange={handleCommentChange}
            />
          </Modal>
        </div>
        <div className="product-download">
          {/* Nút download */}
          <button
            onClick={handleDownloadClick}
            href={isLoggedIn ? "/payment" : "/login"}
          >
            <Icon>paid</Icon>
            <span>Payment</span>
          </button>
        </div>
        <div className="product-fullscreen">
          <button onClick={toggleFullscreen}>
            <Icon>fullscreen</Icon>
            <span>Fullscreen</span>
          </button>
        </div>
      </div>
      <div className="product-info">
        <div
          style={{
            width: "70%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "130px"
          }}
        >
          <a
            onClick={handleAuthorClick}
            href={isLoggedIn ? "/profile" : "/login"}
            className="author"
          >
            <img src="" alt="Author Avatar" />
          </a>
          <div className="artist">
            <p>
              <strong>{itemData.name}</strong>
            </p>
            <p>
              Artist: <strong>{itemData.user_Name}</strong>
            </p>
            {/* Thông tin về tác giả */}
          </div>
          <div className="public">
            <p>
              <strong>Published:</strong> {new Date(itemData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            {userData.userInfo?.fullName === itemData.user_Name && (
              <div style={{display: "flex", gap:"10px"}}>
                <DeleteArt ID={ID}/>
                <EditArt itemData={itemData}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
