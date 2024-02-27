import "./App.css";
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./component/footer/Footer";
import Header from "./component/header/Header";
import Login from "./component/header/login-pages/Login";
import Register from "./component/header/register/Register";
import Home from "./component/body/home-pages/Home";
import Detail from "./component/Details/Detail";
import RecoveryPassword from "./component/header/recovery-password/RecoveryPassword";
import Profile from "./component/profile/Profile";
import ProfileNav from "./component/profile/profile-Nav/ProfileNav";
import Payment from "./component/payment/Payment";

function App() {
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(
    location.pathname === "/login"
  );
  const [isRegisterPage, setIsRegisterPage] = useState(
    location.pathname === "/regis"
  );

  // Khi đường dẫn thay đổi, kiểm tra xem trang hiện tại có phải là trang Login hoặc Register không
  React.useEffect(() => {
    setIsLoginPage(location.pathname === "/login");
    setIsRegisterPage(location.pathname === "/regis");
  }, [location]);
  React.useEffect(() => {
    setIsLoginPage(location.pathname === "/login");
  }, [location]);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/recovery-password" element={<RecoveryPassword />}></Route>
        <Route path="/regis" element={<Register />}></Route>
        <Route path="/detail/:ID" element={<Detail />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
      </Routes>
      <Footer isLoginPage={isLoginPage} isRegisterPage={isRegisterPage} />
    </div>
  );
}

export default App;
