import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./component/footer/Footer";
import Header from "./component/header/Header";
import Login from "./component/header/login-pages/Login";
import Register from "./component/header/register/Register";
import Home from "./component/body/home-pages/Home";
import Detail from "./component/Details/Detail";
import RecoveryPassword from "./component/header/recovery-password/RecoveryPassword";
import Profile from "./component/profile/Profile";
import Payment from "./component/payment/Payment";
import { SearchList } from "./component/header/search/searchlist/SearchList";
import ChangePassword from "./component/change-password/ChangePassword";
import EmailOTP from "./component/header/emailOTP/EmailOTP";
import HomeAdmin from "./admin-page/homeadmin/HomeAdmin";
import Request from "./component/Details/request/Request";

function App() {
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(location.pathname === "/login");
  const [isRegisterPage, setIsRegisterPage] = useState(location.pathname === "/regis");
  const [isRecoveryPage, setIsRecoveryPage] = useState(location.pathname === "/recovery-password");
  const [isEmailOTP, setIsEmailOTP] = useState(location.pathname === "/emailOTP");
  const [showFooter, setShowFooter] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const isHomeAdmin = location.pathname.startsWith("/home-admin");

  useEffect(() => {
    setIsLoginPage(location.pathname === "/login");
    setIsRegisterPage(location.pathname === "/regis");
    setIsRecoveryPage(location.pathname === "/recovery-password");
    setIsEmailOTP(location.pathname === "/emailOTP");
  }, [location]);

  useEffect(() => {
    setShowFooter(
      !isLoginPage &&
      !isRegisterPage &&
      !isRecoveryPage &&
      !isEmailOTP &&
      !isHomeAdmin
    );
    setShowHeader(
      !isLoginPage &&
      !isRegisterPage &&
      !isRecoveryPage &&
      !isEmailOTP &&
      !isHomeAdmin
    );
  }, [location, isLoginPage, isRegisterPage, isRecoveryPage, isEmailOTP, isHomeAdmin]);

  const [userById, setUserById] = useState([]);
  
  return (
    <div className="App">
      {showHeader && (
        <Header
          isLoginPage={isLoginPage}
          isRegisterPage={isRegisterPage}
          isRecoveryPage={isRecoveryPage}
          isEmailOTP={isEmailOTP}
          isHomeAdmin={isHomeAdmin}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {isHomeAdmin && (
          <Route path="/home-admin/*" element={<HomeAdmin />}></Route>
        )}
        {/* header */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/recovery-password" element={<RecoveryPassword />}></Route>
        <Route path="/emailOTP" element={<EmailOTP />}></Route>
        <Route path="/regis" element={<Register />}></Route>
        <Route path="/searchlist" element={<SearchList />}></Route>
        {/* detail */}
        <Route path="/detail/:ID" element={<Detail setUserById={setUserById}/>}></Route>
        <Route path="/payment/:imageUrl/:price" element={<Payment />}></Route>
        <Route path="/request" element={<Request userById={userById}/>}></Route>
        {/* profile */}
        <Route path="/profile/*" element={<Profile />}></Route>
        <Route path="/changepassword" element={<ChangePassword />}></Route>
      </Routes>
      {showFooter && !isHomeAdmin && (
        <Footer
          isLoginPage={isLoginPage}
          isRegisterPage={isRegisterPage}
          isRecoveryPage={isRecoveryPage}
          isEmailOTP={isEmailOTP}
          isHomeAdmin={isHomeAdmin}
        />
      )}
    </div>
  );
}

export default App;
