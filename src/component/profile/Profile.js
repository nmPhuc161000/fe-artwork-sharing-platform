import React, { useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import ProfileNav from './profile-Nav/ProfileNav';
import About from './profile-Nav/about/About';
import { Shop } from './profile-Nav/shop/Shop';

function Profile() {

  return (
    <div className="profile">
      <ProfileNav />
      <Routes>
        {/* Route cho trang About */}
        <Route path="about" element={<About/>} />
        <Route path="shop" element={<Shop/>} />
      </Routes>
    </div>
  );
}

export default Profile;
