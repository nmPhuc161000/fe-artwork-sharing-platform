import React, { useState } from "react";
import "./Shop.css";
import CreateArt from "./createart/CreateArt";
import axios from "axios";
import ArtOfUser from "./artofuser/ArtOfUser";

export const Shop = () => {
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);

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

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const token = localStorage.getItem("token");

  const handleSave = async () => {
    if (!name || !categoryName || !description || !price) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Category_Name", categoryName);
    formData.append("Description", description);
    formData.append("Price", price);
    formData.append("ImageFile", imageFile); // Không cần thêm file và fileName

    try {
      // Gửi yêu cầu POST đến API
      const response = await axios.post(
        "https://localhost:44306/api/Artwork/create",
        formData,
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
      console.log(formData);
    }
  };

  return (
    <div className="shopUser">
      {/* hàm tạo ảnh và thêm thông tin */}
      <div className="content">
        <div className="commissions">
          <span>Commissions</span>
        </div>
        <div className="createOfUser">
          <div className="createArt">
            <a href="#popup1"><CreateArt /></a>
          </div>

          <div className="forUser">
            <ArtOfUser/>
          </div>
        </div>
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
                onChange={(e) => handleImageFile(e)}
                accept="image/*"
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
