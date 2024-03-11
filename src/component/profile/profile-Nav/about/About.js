import React, { useState } from "react";
import "./About.css";
import urlApi from "../../../configAPI/UrlApi";
import axios from "axios";

export default function About({ userInfor, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(userInfor.fullName || "");
  const [email, setEmail] = useState(userInfor.email || "");
  const [phoneNumber, setPhone] = useState(userInfor.phoneNumber || "");
  const [address, setAddress] = useState(userInfor.address || "");

  const handleFullNameChange = (value) => {
    setFullName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePhoneNumberChange = (value) => {
    setPhone(value);
  };

  const handleAddressChange = (value) => {
    setAddress(value);
  };

  const token = localStorage.getItem('token');
  const handleSaveClick = () => {
    const userData = {
      fullName: fullName,
      email: email,
      phoneNo: phoneNumber,
      address: address,
    };
    axios
      .put(`${urlApi}/api/Auth/update-user`, userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        if (response.status === 200) {
          setIsEditing(false);
        } else {
          throw new Error("Failed to update user data");
        }
        onUpdate(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div>
      <div className="about-container">
        <div className="about-info">
          <h4>Thông tin cá nhân</h4>

          <div>
            {!isEditing ? (
              <ul>
                <li>
                  <label htmlFor="fullName">Full Name:</label>
                  <div className="info-input">{userInfor.fullName}</div>
                </li>
                <li>
                  <label htmlFor="userName">Email:</label>
                  <div className="info-input">{userInfor.email}</div>
                </li>
                <li>
                  <label htmlFor="address">Phone:</label>
                  <div className="info-input">{userInfor.phoneNumber}</div>
                </li>
                <li>
                  <label htmlFor="createdAt">Created At:</label>
                  <div className="info-input">
                    {new Date(userInfor.createdAt).toLocaleString()}
                  </div>
                </li>
              </ul>
            ) : (
              <div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => handleFullNameChange(e.target.value)}
                />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => handleAddressChange(e.target.value)}
                />
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                />
                <button onClick={handleSaveClick}>Lưu</button>
              </div>
            )}
            {!isEditing && (
              <div style={{ textAlign: "right" }}>
                <button className="edit-button" onClick={handleEditClick}>
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
