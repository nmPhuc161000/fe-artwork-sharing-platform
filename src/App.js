import './App.css';
import React, { useState } from 'react';
import { Routes, Route, useLocation  } from "react-router-dom";
import Footer from './component/footer/Footer';
import Header from './component/header/Header';
import Login from './component/header/login-pages/Login';
import Register from './component/header/register/Register';
import Home from './component/body/home-pages/Home'
import Cart from './component/cart/Cart';
import Detail from './component/Details/Detail';
import RecoveryPassword from './component/header/recovery-password/RecoveryPassword';
import Profile from './component/profile/Profile';

function App() {
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(location.pathname === '/login');
  const [isRegisterPage, setIsRegisterPage] = useState(location.pathname === '/register');

  // Khi đường dẫn thay đổi, kiểm tra xem trang hiện tại có phải là trang Login hay không
  React.useEffect(() => {
    setIsLoginPage(location.pathname === '/login');
    setIsRegisterPage(location.pathname === '/regis');
  }, [location]);
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/recovery-password" element={<RecoveryPassword/>}></Route>
        <Route path="/regis" element={<Register/>}></Route>
        <Route path="/detail" element={<Detail/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
      <Footer isLoginPage={isLoginPage} isRegisterPage={isRegisterPage}/>
    </div>
  );
}

export default App;
