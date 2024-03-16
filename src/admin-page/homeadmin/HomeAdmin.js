import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Sidebar from '../sidebar/Sidebar';
import Admin from '../admin/Admin';
import HeaderAdmin from '../headeradmin/HeaderAdmin';
import './HomeAdmin.css'
import { Routes, Route } from 'react-router-dom';
import Product from '../product/Product';

export default function HomeAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='grid-container'>
      <HeaderAdmin toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <Routes>
        <Route path='dashboard' element={<Admin />}/>
        <Route path='product' element={<Product/>}/>
      </Routes>
      
    </div>
  )
}
