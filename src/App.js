import './App.css';
import { Routes, Route } from "react-router-dom";
import Footer from './component/footer/Footer';
import Header from './component/header/Header';
import Login from './component/header/login-pages/Login';
import Register from './component/header/register/Register';
import Home from './component/body/home-pages/Home'
import Detail from './component/details/Detail';
import Cart from './component/cart/Cart';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/detail' element={<Detail />}></Route>
        <Route path='./cart' element={<Cart/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/regis" element={<Register/>}></Route>
        <Route path="/login/regis" element={<Register/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
