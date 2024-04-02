import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import MailIcon from "@mui/icons-material/Mail";
import PaidIcon from "@mui/icons-material/Paid";
import { Link } from "react-router-dom";
import "./Detail.css";
import urlApi from "../../configAPI/UrlApi";
import axios from "axios";
import EditArt from "./editArt/EditArt";
import DeleteArt from "./deleteArt/DeleteArt";
import Favourite from "./favourite/Favourite";
import { imgDb } from "../../configFirebase/config";
import { getDownloadURL, listAll, ref } from "firebase/storage";

export default function Detail({ setUserById, statusPay }) {
  const [comment, setComment] = useState("");
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); // State để điều khiển việc hiển thị modal comment
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [updateState, setUpdateState] = useState([]);
  const token = localStorage.getItem("token");

  const urlNoAva =
    "https://firebasestorage.googleapis.com/v0/b/artwork-platform.appspot.com/o/logo%2F499638df-cf1c-4ee7-9abf-fb51e875e6dc?alt=media&token=367643f5-8904-4be8-97a0-a794e6b76bd0";

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  // const handleCommentChange = (event) => {
  //   setComment(event.target.value);
  // };

  // const handleCommentSubmit = () => {
  //   // Logic for submitting comment
  //   console.log("Comment submitted:", comment);
  //   // Close the modal after submitting comment
  //   setIsCommentModalOpen(false);
  // };

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

  const navigate = useNavigate();
  const location = useLocation();

  const handlePayment = (navigate, location) => {
    console.log("Redirect path:", location.pathname);
    if (isLoggedIn) {
      navigate("/payment");
    } else {
      localStorage.setItem("redirectPath", location.pathname);
      navigate("/login");
    }
  };

  const handleRequest = (navigate, location) => {
    console.log("Redirect path:", location.pathname);
    if (isLoggedIn) {
      navigate("/request");
    } else {
      localStorage.setItem("redirectPath", location.pathname);
      navigate("/login");
    }
  };

  const [itemData, setItemData] = useState([]);
  const { ID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urlApi}/api/Artwork/${String(ID)}`);
        setItemData(response.data);
        setUserById(response.data);
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
  const [userData, setUserData] = useState([]);
  const fetchUserData = async () => {
    try {
      const response = await axios.post(
        `${urlApi}/api/Auth/me`,
        {
          token: token,
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
  }, [updateState]);

  //tải ảnh về
  const [imgUrl, setImgUrl] = useState("");
  useEffect(() => {
    listAll(ref(imgDb, "")).then(async (imgs) => {
      const urls = await Promise.all(
        imgs.items.map(async (val) => {
          const url = await getDownloadURL(val);
          return url;
        })
      );
      setImgUrl(urls);
    });
  }, []);

  const downloadImage = () => {
    let found = false;

    // Lặp qua mỗi URL trong mảng imgUrl
    imgUrl.forEach((url) => {
      // Kiểm tra nếu URL từ Firebase khớp với uri_Image của itemData
      if (url === itemData.url_Image) {
        // Nếu có sự khớp, đặt found thành true
        found = true;
        // Tạo một thẻ <a> ẩn để tải ảnh
        fetch(url, {
          mode: "no-cors",
        })
          .then((response) => response.blob())
          .then((blob) => {
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = url.replace(/^.*[\\\/]/, '');
            link.href = blobUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
      }
    });

    // Kiểm tra nếu không tìm thấy ảnh khớp
    if (!found) {
      alert("Ảnh này không tồn tại.");
      console.log(imgUrl);
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
        <Favourite itemData={itemData} />
        <div className="product-comment">
          {/* Clicking on the icon opens the comment modal */}
          <button onClick={downloadImage}>
            <CommentIcon />
            <span>Comment</span>
          </button>
          {/* Modal displayed when isCommentModalOpen state is true */}
          {/* <Modal
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
          </Modal> */}
        </div>
        <div className="product-download">
          {isLoggedIn ? (
            <Link to={`/payment`}>
              <button onClick={() => handlePayment(navigate, location)}>
                <PaidIcon />
                <span>Payment ${itemData.price}</span>
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button onClick={() => handlePayment(navigate, location)}>
                <PaidIcon />
                <span>Thanh toán</span>
              </button>
            </Link>
          )}
        </div>
        {/* request */}
        <div className="product-request">
          <button
            onClick={() => handleRequest(navigate, location)}
            href={isLoggedIn ? "/request" : "/login"}
          >
            <MailIcon />
            <span>Request</span>
          </button>
        </div>
        {/* request */}
        <div className="product-fullscreen">
          <button onClick={toggleFullscreen}>
            <FullscreenIcon />
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
            height: "130px",
          }}
        >
          <div style={{ width: "70px" }}>
            <div style={{ height: "30px" }}></div>
            <a
              onClick={handleAuthorClick}
              href={isLoggedIn ? "/profile" : "/login"}
              className="author"
            >
              <img src={urlNoAva} alt="Author Avatar" />
            </a>
          </div>
          <div className="artist">
            <p>
              <span style={{ fontWeight: "bold", fontSize: "30px" }}>
                {itemData.name}
              </span>
            </p>
            <p>
              Artist:{" "}
              <span style={{ fontWeight: "bold" }}>{itemData.nick_Name}</span>
            </p>
            {/* Thông tin về tác giả */}
          </div>
          <div className="public">
            <p>
              <strong>Published:</strong>{" "}
              {new Date(itemData.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {statusPay && statusPay.id === itemData.id ? (
              <div>myname</div>
            ) : (
              userData.userInfo?.nickName === itemData.nick_Name && (
                <div style={{ display: "flex", gap: "10px" }}>
                  <DeleteArt ID={ID} />
                  <EditArt
                    itemData={itemData}
                    setUpdateState={setUpdateState}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}