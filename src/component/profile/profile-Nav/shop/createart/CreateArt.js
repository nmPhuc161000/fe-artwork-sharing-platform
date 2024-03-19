import React, { useState, useEffect } from "react";
import "./CreatrArt.css";
import urlApi from "../../../../../configAPI/UrlApi";
import { Icon } from "react-materialize";
import axios from "axios";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { imgDb } from "../../../../../configFirebase/config";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

export default function CreateArt({ onCreate }) {
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imgUrl, setImgUrl] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleName = (value) => {
    setName(value);
  };

  const handleCategoryName = (event) => {
    const selectedOption = event.target.value;
    setCategoryName(selectedOption);
  };

  const handleDescription = (value) => {
    setDescription(value);
  };

  const handlePrice = (value) => {
    setPrice(value);
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

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

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleSave = async () => {
    if (!name || !categoryName || !description || !price) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
setIsLoading(true);
    const imgRef = ref(imgDb, `/${v4()}`);
    const snapshot = await uploadBytes(imgRef, imageFile);
    const url = await getDownloadURL(snapshot.ref);

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Category_Name", categoryName);
    formData.append("Description", description);
    formData.append("Price", price);
    formData.append("Url_Image", url); // Không cần thêm file và fileName
    
    try {
      // Gửi yêu cầu POST đến API
      const response = await axios.post(
        `${urlApi}/api/Artwork/create`,
        formData,
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //Reset input after create successful
      setName("");
      setCategoryName("");
      setDescription("");
      setPrice("");
      setImageFile("");
      setIsLoading(false);
      console.log("url", response.data);
      alert("Tạo thành công");
      navigate("/profile/shop");
      setIsPopupOpen(false);
      onCreate(response);
    } catch (error) {
      // Xử lý lỗi
      console.log("URL", url);
      alert("Hãy kiểm tra lại thông tin nhập vào!");
      console.error("Đã có lỗi xảy ra khi gửi yêu cầu API:", error.message);
      console.log(formData);
    }
  };

  useEffect(() => {
    const isUserLoggedIn = token !== null;
    setIsLogin(isUserLoggedIn);

    // Redirect to login if not logged in
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <div className="createart">
      {isLogin && (
        <a href="#popupCreate" onClick={() => setIsPopupOpen(true)}>
          <div className="createArt">
            <div className="cartcreate">
              <div>
                <Icon>add</Icon>
              </div>
              <span>Create a new artwork</span>
              <p>
                Offer custom creations directly to deviants who love your style.
              </p>
            </div>
          </div>
        </a>
      )}

      {/* popup */}
      {isPopupOpen && (
        <div id="popupCreate" className="overlay">
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
            <div className="popupCreate">
              <div className="popupInput">
                <input
                  type="text"
                  placeholder="Enter name of artwork *"
                  onChange={(e) => handleName(e.target.value)}
                />
              </div>

              <FormControl
                sx={{ m: 1, minWidth: 120 }}
                style={{ margin: "0 0 5px 0", width: "100%" }}
              >
                <InputLabel id="demo-simple-select-helper-label">
                  Category *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={categoryName}
                  onChange={handleCategoryName}
                  label="Category *"
                >
                  <MenuItem value={"AI"}>AI</MenuItem>
                  <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
                  <MenuItem value={"Galaxy"}>Galaxy</MenuItem>
                  <MenuItem value={"Landscape"}>Landscape</MenuItem>
                  <MenuItem value={"Dragon"}>Dragon</MenuItem>
                  <MenuItem value={"Home"}>Home</MenuItem>
                </Select>
              </FormControl>

              <div className="popupInput">
                <input
                  type="text"
                  placeholder="Enter description of artwork *"
                  onChange={(e) => handleDescription(e.target.value)}
                />
              </div>
              <div className="popupInput">
                <input
                  type="text"
                  placeholder="Enter price of artwork ($) *"
                  onChange={(e) => handlePrice(e.target.value)}
                />
                <span style={{fontWeight: "bold"}}>$</span>
              </div>
              <div className="popupInput">
                <input
                  type="file"
                  onChange={(e) => handleImageFile(e)}
                  accept="image/*"
                />
              </div>
              <div className="popupButtonCreate">
                <button onClick={() => handleSave()} disabled={isLoading}>
                  <span>{isLoading ? "Creating..." : "Create"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
