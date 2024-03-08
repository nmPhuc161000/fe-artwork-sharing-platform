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
import Payment from "./component/payment/Payment";
import { SearchList } from "./component/header/search/searchlist/SearchList";
import ChangePassword from "./component/change-password/ChangePassword";

function App() {
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(
    location.pathname === "/login"
  );
  const [isRegisterPage, setIsRegisterPage] = useState(
    location.pathname === "/regis"
  );
  const [showFooter, setShowFooter] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  React.useEffect(() => {
    setIsLoginPage(location.pathname === "/login");
    setIsRegisterPage(location.pathname === "/regis");
  }, [location]);
  React.useEffect(() => {
    setIsLoginPage(location.pathname === "/login");
    setShowFooter(
      location.pathname !== "/login" && location.pathname !== "/regis"
    );
    setShowHeader(
      location.pathname !== "/login" && location.pathname !== "/regis"
    );
  }, [location]);
  return (
    <div className="App">
      <Header isLoginPage={isLoginPage} isRegisterPage={isRegisterPage} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* header */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/recovery-password" element={<RecoveryPassword />}></Route>
        <Route path="/regis" element={<Register />}></Route>
        <Route path="/searchlist" element={<SearchList />}></Route>
        {/* detail */}
        <Route path="/detail/:ID" element={<Detail />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        {/* profile */}
        <Route path="/profile/*" element={<Profile />}></Route>
        <Route path="/changepassword" element={<ChangePassword />}></Route>
      </Routes>
      <Footer isLoginPage={isLoginPage} isRegisterPage={isRegisterPage} />
    </div>
  );
}

export default App;
