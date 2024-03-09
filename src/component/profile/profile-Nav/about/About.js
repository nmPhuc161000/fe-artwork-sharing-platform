import React, { useState, useEffect } from 'react';
import './About.css';
import axios from 'axios';

export default function About({ userId }) {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserData, setNewUserData] = useState({ fullName: '', email: '', address: '', phoneNo: '' });

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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSaveClick = () => {
    axios.put('https://localhost:44306/api/Auth/update-user', newUserData)
      .then(response => {
        if (response.status === 200) {
          // Nếu cập nhật thành công, cập nhật lại state userData để hiển thị thông tin mới
          setUserData(newUserData);
          // Tắt chế độ chỉnh sửa
          setIsEditing(false);
        } else {
          throw new Error('Failed to update user data');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const handleEditClick = () => {
    setIsEditing(true);
    // Sao chép thông tin người dùng hiện tại vào newUserData để chỉnh sửa
    setNewUserData(userData);
  };

  return (
    <div>
      <div className="about-container">
        <div className="about-info">
          <h4>Thông tin cá nhân</h4>
          {userData && (
            <div>
              {!isEditing ? (
                <ul>
                  <li>
                    <label htmlFor="fullName">Full Name:</label>
                    <div className="info-input">{userData.fullName}</div>
                  </li>
                  <li>
                    <label htmlFor="userName">Email:</label>
                    <div className="info-input">{userData.email}</div>
                  </li>
                  <li>
                    <label htmlFor="address">Phone:</label>
                    <div className="info-input">{userData.phoneNo}</div>
                  </li>
                  <li>
                    <label htmlFor="createdAt">Created At:</label>
                    <div className="info-input">{new Date(userData.createdAt).toLocaleString()}</div>
                  </li>
                </ul>
              ) : (
                <div>
                  <input type="text" name="fullName" value={newUserData.fullName} onChange={handleInputChange} />
                  <input type="text" name="email" value={newUserData.email} onChange={handleInputChange} />
                  <input type="text" name="address" value={newUserData.address} onChange={handleInputChange} />
                  <input type="text" name="phone" value={newUserData.phoneNo} onChange={handleInputChange} />
                  <button onClick={handleSaveClick}>Lưu</button>
                </div>
              )}
              {!isEditing && (
                <button className="edit-button" onClick={handleEditClick}>Edit</button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
