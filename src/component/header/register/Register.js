import React, { useState } from "react";
import "./Register.css";
import axios from "axios";

export default function Register() {
  const [username, setUserName] = useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
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

  const handleSave = () => {
    if (!fullname || !email || !username || !password || !address || !phone) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // const data = {
    //   FullName: fullname,
    //   Email: email,
    //   UserName: username,
    //   Password: password,
    //   Address: address,
    //   PhoneNo: phone
    // };

    axios({
      method: 'post',
      url: 'http://localhost:5188/api/Auth/register',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
      FullName: fullname,
      Email: email,
      UserName: username,
      Password: password,
      Address: address,
      PhoneNo: phone
      }
    });

    // const url = 'https://localhost:44306/api/Auth/register';

    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(response => {
    //     // Kiểm tra mã trạng thái của phản hồi từ máy chủ
    //     if (response.ok) {
    //       return response.json(); // Trả về dữ liệu JSON nếu có
    //     } else {
    //       throw new Error("Đã xảy ra lỗi.");
    //     }
    //   })
    //   .then(data => {
    //     alert("Đăng ký thành công!");
    //     console.log(data); // Dữ liệu trả về từ máy chủ
    //   })
    //   .catch(error => {
    //     console.error("Lỗi trong quá trình đăng ký:", error);
    //     alert("Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau.");
    //   });
  };

  return (
    <>
      <div className="regisPage">
        <div className="overlay"></div>
        <div className="register">
          <div className="logoLogin">
            <img src="./assets/image/logo.png" alt=""></img>
          </div>
          <div className="title">Register Now</div>
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
            <button type="submit" onClick={() => handleSave()}>Create</button>
          </div>
        </div>
      </div>
    </>
  );
}
