import React, { useState, useEffect } from 'react';
import './About.css';

export default function About({ userId }) {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Gửi yêu cầu GET để lấy thông tin người dùng từ API
    fetch(`https://localhost:44306/api/Auth/user/${userId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch user data');
      })
      .then(data => {
        // Cập nhật state với dữ liệu lấy được từ API
        setUserData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div>
      <div className="about-container">
        <div className="about-info">
          <h4>Thông tin cá nhân</h4>
          {userData && (
            <ul>
              <li>
                <label htmlFor="fullName">Full Name:</label>
                <div className="info-input">{userData.fullName}</div>
              </li>
              <li>
                <label htmlFor="userName">Username:</label>
                <div className="info-input">{userData.userName}</div>
              </li>
              <li>
                <label htmlFor="email">Email:</label>
                <div className="info-input">{userData.email}</div>
              </li>
              <li>
                <label htmlFor="createdAt">Created At:</label>
                <div className="info-input">{new Date(userData.createdAt).toLocaleString()}</div>
              </li>
            </ul>
          )}
          {userData?.id === userId && (
            <button className="edit-button" onClick={handleEditClick}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}
