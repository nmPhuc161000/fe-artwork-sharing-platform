import './App.css';
import Footer from './component/footer/Footer';
import Header from './component/header/Header';
import Login from './component/header/login-pages/Login';
import Register from './component/header/register/Register';
import Home from './component/body/home-pages/Home'
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/regis" element={<Register/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
