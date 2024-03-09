import React, { useState, useEffect } from "react";
import "./EditArt.css";
import { Icon } from "react-materialize";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { imgDb } from "../../../configFirebase/config";

export default function EditArt({ itemData }) {
  const [name, setName] = useState(itemData.name || "");
  const [categoryName, setCategoryName] = useState(
    itemData.category_Name || ""
  );
  const [description, setDescription] = useState(itemData.description || "");
  const [price, setPrice] = useState(itemData.price || "");
  const [image, setImage] = useState(itemData.url_Image || "");
  const [imageFile, setImageFile] = useState(null);
  const [imgUrl, setImgUrl] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
      setImage(URL.createObjectURL(file));
    } else {
      setImage(itemData.url_Image || "");
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
  const handleEdit = async () => {
    let url = itemData.url_Image || "";
    if (imageFile) {
      const imgRef = ref(imgDb, `films/${v4()}`);
      const snapshot = await uploadBytes(imgRef, imageFile);
      url = await getDownloadURL(snapshot.ref);
    }
    const editData = {
      name: name,
      category_Name: categoryName,
      description: description,
      price: parseFloat(price),
      url_Image: url,
    };
    try {
      // Make a DELETE request to the API endpoint
      const response = await axios.put(
        `https://localhost:44306/api/Artwork/update-artwork?id=${itemData.id}`,
        editData,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the response as needed
      console.log("Delete successful:", response.data);
      alert("Update Artwork successful!");
      navigate(`/detail/${itemData.id}`);
    } catch (error) {
      // Handle errors
      console.log(editData);
      console.error("Error updating:", error);
    }
  };
  return (
    <div>
      <a href="#popupEdit">
        <Icon className="iconEdit">edit</Icon>
      </a>

      <div id="popupEdit" className="overlay">
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
                value={name}
                onChange={(e) => handleName(e.target.value)}
              />
            </div>

            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              style={{ margin: "0 0 5px 0", width: "100%" }}
            >
              <InputLabel id="demo-simple-select-helper-label">
                {categoryName}
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={categoryName}
                onChange={handleCategoryName}
                label="Category"
              >
                <MenuItem value={"AI"}>AI</MenuItem>
                <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
                <MenuItem value={"Galaxy"}>Galaxy</MenuItem>
                <MenuItem value={"Landscape"}>Landscape</MenuItem>
                <MenuItem value={"Dragon"}>Dragon</MenuItem>
              </Select>
            </FormControl>

            <div className="popupInput">
              <input
                type="text"
                value={description}
                onChange={(e) => handleDescription(e.target.value)}
              />
            </div>
            <div className="popupInput">
              <input
                type="text"
                value={price}
                onChange={(e) => handlePrice(e.target.value)}
              />
            </div>
            <div className="popupInput">
              <input
                type="file"
                onChange={(e) => handleImageFile(e)}
                accept="image/*"
              />
              {image && <div style={{ fontSize: "10px", width: "90%" }}>{image}
              </div>}
            </div>
            <div className="popupButton">
              <button onClick={() => handleEdit()}>Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
