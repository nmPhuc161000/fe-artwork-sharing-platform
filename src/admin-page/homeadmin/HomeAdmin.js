import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Sidebar from '../sidebar/Sidebar';
import Admin from '../admin/Admin';
import HeaderAdmin from '../headeradmin/HeaderAdmin';
import './HomeAdmin.css'

export default function HomeAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='grid-container'>
      <HeaderAdmin toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <Admin />
    </div>
  )
}
