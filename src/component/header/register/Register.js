import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleFullNameChange = (value) => {
    setFullName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleUserNameChange = (value) => {
    setUserName(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handlePhoneNoChange = (value) => {
    setPhone(value);
  };

  const handleAddressChange = (value) => {
    setAddress(value);
  };

  const navigate = useNavigate();

  const handleSave = async () => {
    if (!fullName || !email || !userName || !password) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const data = {
      UserName: userName,
      FullName: fullName,
      Email: email,
      Password: password,
      PhoneNo: phoneNo,
      Address: address,
    };

    try {
      // Gửi yêu cầu POST đến API
      const response = await axios.post(
        "https://0c1a-45-122-246-83.ngrok-free.app/api/Auth/register",
        data
      );

      console.log(response.data);
      navigate("/login");
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
    } catch (error) {
      // Xử lý lỗi
      alert("Hãy kiểm tra lại thông tin nhập vào!");
      console.error("Đã có lỗi xảy ra khi gửi yêu cầu API:", error.message);
      console.log(data);
    }
  };

  return (
    <>
      <div className="regisPage">
        <div className="overlay"></div>
        <div className="register">
          <div className="logoLogin">
            <img src="./assets/image/logo.png" alt=""></img>
          </div>
          <div className="title">Register Now!</div>
          <div className="group">
            <input
              type="text"
              placeholder="Fullname"
              onChange={(e) => handleFullNameChange(e.target.value)}
            />
          </div>
          <div className="group">
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => handleEmailChange(e.target.value)}
            />
          </div>
          <div className="group">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => handleUserNameChange(e.target.value)}
            />
          </div>
          <div className="group">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
          </div>
          <div className="group">
            <input
              type="text"
              placeholder="address"
              onChange={(e) => handleAddressChange(e.target.value)}
            />
          </div>
          <div className="group">
            <input
              type="text"
              placeholder="phone"
              onChange={(e) => handlePhoneNoChange(e.target.value)}
            />
          </div>
          <div className="signUp">
            <button type="submit" onClick={() => handleSave()}>
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
