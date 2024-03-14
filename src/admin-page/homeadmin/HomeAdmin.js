import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Sidebar from '../sidebar/Sidebar';
import Admin from '../admin/Admin';
import HeaderAdmin from '../headeradmin/HeaderAdmin';
import './HomeAdmin.css'

export default function HomeAdmin() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <HeaderAdmin OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Admin />
    </div>
  )
}
