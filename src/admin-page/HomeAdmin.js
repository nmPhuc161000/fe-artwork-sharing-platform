import React, {useState} from 'react'
import { useNavigate } from 'react-router';

export default function HomeAdmin() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
    
  };
  return (
    <div>HomeAdmin
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
