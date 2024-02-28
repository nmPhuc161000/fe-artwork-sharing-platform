import React, { useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import ProfileNav from './profile-Nav/ProfileNav';
import About from './profile-Nav/about/About';
import Shop from './profile-Nav/shop/Shop';

function Profile({ showAboutInfo, editMode, userInfo, handleEdit, handleSave, setUserInfo }) {

  return (
    <div className="profile">
      <ProfileNav />
      {showAboutInfo && (
        <div className="about-info">
          <p>Họ và tên: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
          <p>Số điện thoại: {userInfo.phone}</p>
          <p>Địa chỉ: {userInfo.address}</p>
          <button onClick={handleEdit}>Thay đổi thông tin</button>
        </div>
      )}

      {editMode && (
        <div className="edit-form">
          <input type="text" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
          <input type="text" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
          <input type="text" value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} />
          <input type="text" value={userInfo.address} onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })} />
          <button onClick={handleSave}>Save</button>
        </div>
      )}

      <Routes>
        {/* Route cho trang About */}
        <Route path="about" element={<About/>} />
        <Route path="shop" element={<Shop/>} />
      </Routes>
    </div>
  );
}

export default Profile;
