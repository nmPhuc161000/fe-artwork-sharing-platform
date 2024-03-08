import React, { useState, useEffect } from 'react';
import './About.css';
import axios from 'axios';

export default function About({ userId }) {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Gửi yêu cầu GET để lấy thông tin người dùng từ API bằng Axios
    axios.get('https://localhost:44306/api/Auth/users')
      .then(response => {
        // Kiểm tra nếu yêu cầu thành công
        if (response.status === 200) {
          // Lấy danh sách người dùng từ response
          const users = response.data;
          // Chọn một người dùng để hiển thị (trong ví dụ này, chỉ lấy người dùng đầu tiên)
          const user = users[0];
          // Cập nhật state với thông tin của người dùng được chọn
          setUserData(user);
        } else {
          throw new Error('Failed to fetch user data');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

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
          {userData && (
            <button className="edit-button" onClick={handleEditClick}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}
