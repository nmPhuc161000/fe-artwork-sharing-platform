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
import HomeAdmin from "./admin-page/HomeAdmin";

function App() {
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(
    location.pathname === "/login"
  );
  const [isRegisterPage, setIsRegisterPage] = useState(
    location.pathname === "/regis"
  );
  const [isHomeAdmin, setIsHomeAdmin] = useState(
    location.pathname === "/home-admin"
  );
  React.useEffect(() => {
    setIsLoginPage(location.pathname === "/login");
    setIsRegisterPage(location.pathname === "/regis");
    setIsHomeAdmin(location.pathname === "/home-admin");
  }, [location]);
  React.useEffect(() => {
    setIsLoginPage(location.pathname === "/login");
    setIsRegisterPage(location.pathname === "/regis");
    setIsHomeAdmin(location.pathname === "/home-admin");
  }, [location]);
  return (
    <div className="App">
      {(!isLoginPage && !isRegisterPage && !isHomeAdmin) && (
        <Header isLoginPage={isLoginPage} isRegisterPage={isRegisterPage} isHomeAdmin={isHomeAdmin}/>
      )}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home-admin" element={<HomeAdmin/>}></Route>
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
      {(!isLoginPage && !isRegisterPage && !isHomeAdmin) && (
        <Footer isLoginPage={isLoginPage} isRegisterPage={isRegisterPage} isHomeAdmin={isHomeAdmin}/>
      )}
    </div>
  );
}

export default App;
