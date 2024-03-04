import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon, Modal, Button, Textarea } from "react-materialize";
import "./Detail.css";
import axios from "axios";

export default function Detail() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [comment, setComment] = useState("");
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); // State để điều khiển việc hiển thị modal comment
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const tokenUser = localStorage.getItem("token");
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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
          `https://localhost:44306/api/Artwork/${String(ID)}`
        );
        setItemData(response.data);
        console.log("Data from API: ", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ID]); // Thêm ID vào dependency array để useEffect chạy lại khi ID thay đổi

  // console.log("ID: ", ID);
  // console.log("Token User name: ", userData.userInfo.fullName);
  // console.log("itemData User name: ", itemData.user_Name);

  const handleAuthorClick = () => {
    if (isLoggedIn) {
      window.location.href = "/profile";
    } else {
      // Lưu địa chỉ URL của trang chi tiết trước khi chuyển hướng đến trang đăng nhập
      localStorage.setItem("redirectPath", window.location.pathname);
      window.location.href = "/login";
    }
  };
  //call api để xét tên người dùng
  const [userData, setUserData] = useState({});
  const fetchUserData = async () => {
    try {
      const response = await axios.post(
        "https://localhost:44306/api/Auth/me",
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
  const navigate = useNavigate();

  const handleDelete = async () => { // Replace 'ID' with the actual ID
    try {
      // Make a DELETE request to the API endpoint
      const response = await axios.delete(`https://localhost:44306/api/Artwork/delete/${String(ID)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle the response as needed
      console.log("Delete successful:", response.data);
      alert("Delete successful!");
     navigate("/profile/shop");
    } catch (error) {
      // Handle errors
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="container-card">
      <div className="product-card">
        <div className="product-tumb">
          <img src={itemData.url_Image} alt="Product" />
        </div>
      </div>
      <div className="product-icons">
        <div className="product-favorite">
          {/* Hiển thị nút favorite hoặc nút add vào yêu thích tùy thuộc vào trạng thái isFavorite */}
          {isFavorite ? (
            <button onClick={toggleFavorite}>
              <Icon>favorite</Icon>{" "}
              {/* Icon hiển thị khi sản phẩm đã được thêm vào yêu thích */}
              <span>In Favorites</span>
            </button>
          ) : (
            <button onClick={toggleFavorite}>
              <Icon>favorite_border</Icon>{" "}
              {/* Icon hiển thị khi sản phẩm chưa được thêm vào yêu thích */}
              <span>Add to Favorites</span>
            </button>
          )}
        </div>
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
            width: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
              <strong>Published:</strong> {itemData.createdAt}
            </p>
            {userData.userInfo?.fullName === itemData.user_Name && (
              <a href="#popup1">
                <Icon>delete</Icon>
              </a>
            )}
          </div>
          {/* popup delete */}
          <div id="popup1" className="overlay">
            <div className="popup">
              <div className="iconclose">
                <a
                  className="close"
                  href="#"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  &times;
                </a>
              </div>

              <div className="popupDetail">
                <div className="contentDelete">
                  <div
                    style={{
                      display: "flex",
                      width: "90%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <img
                        src="https://st.deviantart.net/eclipse/global/svg/il05-delete.svg"
                        alt=""
                        style={{ width: "90px", height: "88px" }}
                      />
                    </div>
                    <div style={{ marginLeft: "15px" }}>
                      <div style={{ fontWeight: "bold", fontSize: "25px" }}>
                        Delete this commission?
                      </div>
                    </div>
                  </div>
                </div>
                <div className="popupButton">
                  <button onClick={() => handleDelete()}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
