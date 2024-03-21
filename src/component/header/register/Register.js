import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Icon } from "react-materialize";
import "./Register.css";
import urlApi from "../../../configAPI/UrlApi";
import axios from "axios";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const urlLogo =
    "https://firebasestorage.googleapis.com/v0/b/artwork-platform.appspot.com/o/logo%2Ffeed6075-55fd-4fb3-98d4-946d30029eda?alt=media&token=a3dd9363-73f3-4aec-ae32-264c761a0c0f";

  const handleFullNameChange = (value) => {
    setNickName(value);
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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handlePhoneNoChange = (e) => {
    const input = e.target.value;
    const phoneNumber = input.replace(/\D/g, "");
    if (phoneNumber !== input) {
      setErrorMessage("Please enter only numbers.");
    } else {
      setErrorMessage("");
    }
    setPhone(phoneNumber);
  };

  const handleAddressChange = (value) => {
    setAddress(value);
  };

  const navigate = useNavigate();

  const handleSave = async () => {
    if (!nickName || !email || !userName || !password || !phoneNo) {
      alert("Vui lòng điền đầy đủ thông tin.");
      setIsLoading(false);
      return;
    }
    // Validation Password

    // Validation Email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    if (!emailPattern.test(email)) {
      alert("Vui lòng nhập đúng định dạng email Gmail.");
      setIsLoading(false);
      return;
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      alert(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất một chữ hoa và một ký tự đặc biệt."
      );
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const data = {
      UserName: userName,
      NickName: nickName,
      Email: email,
      Password: password,
      PhoneNo: phoneNo,
      Address: address,
    };

    try {
      // Gửi yêu cầu POST đến API
      const response = await axios.post(`${urlApi}/api/Auth/register`, data);

      console.log(response.data);
      navigate("/login");
      alert(response.data);
    } catch (error) {
      // Xử lý lỗi
      console.error("Đã có lỗi xảy ra khi gửi yêu cầu API:", error);
      alert(error.response);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="regisPage">
        <div className="register">
          <div className="logoLogin">
            <Link to={`/`}>
              <img src={urlLogo} alt="Logo" />
            </Link>
          </div>
          <div className="title">Register Now!</div>
          <div className="group">
            <div className="group-left">
              <div className="group-i">
                <input
                  type="text"
                  placeholder="Nick name (*)"
                  onChange={(e) => handleFullNameChange(e.target.value)}
                />
              </div>
              <div className="group-i">
                <input
                  type="text"
                  placeholder="User name (*)"
                  onChange={(e) => handleUserNameChange(e.target.value)}
                />
              </div>
              <div className="group-i">
                <input
                  type={inputType}
                  placeholder="Password (*)"
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
                <button type="button" onClick={togglePasswordVisibility}>
                  <Icon className="toggle-password-icon">
                    {showPassword ? "visibility_off" : "visibility"}
                  </Icon>
                </button>
              </div>
            </div>
            <div className="group-right">
              <div className="group-i">
                <input
                  type="text"
                  placeholder="Email (*)"
                  onChange={(e) => handleEmailChange(e.target.value)}
                />
              </div>
              <div className="group-i">
                <input
                  type="text"
                  placeholder="Address"
                  onChange={(e) => handleAddressChange(e.target.value)}
                />
              </div>
              <div className="group-i">
                <input
                  type="tel"
                  placeholder="Phone number (*)"
                  onChange={handlePhoneNoChange}
                />
              </div>
            </div>
          </div>
          <div className="Error" style={{}}>
            {errorMessage && <p style={{ color: "#e79494", margin: "0" }}>{errorMessage}</p>}
          </div>
          <div className="signUp">
            <button type="submit" onClick={() => handleSave()}>
              <span>{isLoading ? "Regis..." : "Regis"}</span>
            </button>
          </div>
          <div className="loginInRegis">
            <h6>Bạn đã có tài khoản?</h6>
            <Link to={`/login`}>
              <button>Login</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
