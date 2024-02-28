import React, { useState } from "react";
import "./Shop.css";
import CreateArt from "./createart/CreateArt";
import axios from "axios";

export const Shop = () => {
  const [name, setName] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([]);
  const [imageFile, setImageFile] = useState([]);

  const handleName = (value) => {
    setName(value);
  };

  const handleCategoryName = (value) => {
    setCategoryName(value);
  };

  const handleDescription = (value) => {
    setDescription(value);
  };

  const handlePrice = (value) => {
    setPrice(value);
  };

  const handleImageFile = (value) => {

      setImageFile(value);

  };

  const token = localStorage.getItem("token");

  const handleSave = async () => {
    if (!name || !categoryName || !description || !price) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    const dataCreate = {
      Name: name,
      Category_Name: categoryName,
      Description: description,
      Price: price,
      Url_Image: imageFile,
    };

    try {
      // Gửi yêu cầu POST đến API
      const response = await axios.post(
        "https://localhost:44306/api/Artwork/create",
        dataCreate,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      alert("Tạo thành công");
    } catch (error) {
      // Xử lý lỗi
      alert("Hãy kiểm tra lại thông tin nhập vào!");
      console.error("Đã có lỗi xảy ra khi gửi yêu cầu API:", error.message);
      console.log(dataCreate);
    }
  };

  return (
    <div className="shopUser">
      <div className="content">
        <div className="commissions">
          <span>Commissions</span>
        </div>
        <a href="#popup1" style={{ color: "black", textDecoration: "none" }}>
          <div className="createArt">
            <CreateArt />
          </div>
        </a>
      </div>

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

          <div className="popupCreate">
            <div className="popupInput">
              <input
                type="text"
                placeholder="Enter name of artwork"
                onChange={(e) => handleName(e.target.value)}
              />
            </div>
            <div className="popupInput">
              <input
                type="text"
                placeholder="Enter category_Name of artwork"
                onChange={(e) => handleCategoryName(e.target.value)}
              />
            </div>
            <div className="popupInput">
              <input
                type="text"
                placeholder="Enter description of artwork"
                onChange={(e) => handleDescription(e.target.value)}
              />
            </div>
            <div className="popupInput">
              <input
                type="text"
                placeholder="Enter price of artwork"
                onChange={(e) => handlePrice(e.target.value)}
              />
            </div>
            <div className="popupInput">
              <input
                type="file"
                onChange={(e) => handleImageFile(e.target.value)}
              />
            </div>
            <div className="popupButton">
              <button onClick={() => handleSave()}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
