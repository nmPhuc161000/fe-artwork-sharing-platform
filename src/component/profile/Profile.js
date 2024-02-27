// Trong Profile.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfileNav from './profile-Nav/ProfileNav';
import About from './profile-Nav/about/About';

function Profile() {
  const [showAboutInfo] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Tên Người Dùng',
    image: '/path/to/avatar.jpg',
    email: 'johndoe@example.com',
    phone: '123456789',
    address: '123 Street, City'
  });
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  return (
    <div className="profile">
      <ProfileNav />
      {showAboutInfo && (
        <div className="about-info">
          <p>Họ và tên: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
          <p>Số điện thoại: {userInfo.phone}</p>
          <p>Địa chỉ: {userInfo.address}</p>
          <button onClick={handleEdit}>Thay đổi thông tin người dùng</button>
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
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default Profile;
