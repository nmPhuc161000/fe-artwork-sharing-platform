import React, { useState } from 'react';
import './About.css';

export default function About() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('+1234567890');
  const [address, setAddress] = useState('123 Main Street, City, Country');
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save the updated information here (e.g., send to backend)
    setIsEditing(false);
  };
  return (
    <div>
      <div className="about-container">
        <div className="about-info">
          <h4>Thông tin cá nhân</h4>
          <ul>
            <li>
              <label htmlFor="name">Name:</label>
              <div className="info-input">{isEditing ? <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} /> : name}</div>
            </li>
            <li>
              <label htmlFor="email">Email:</label>
              <div className="info-input">{isEditing ? <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> : email}</div>
            </li>
            <li>
              <label htmlFor="phone">Phone:</label>
              <div className="info-input">{isEditing ? <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /> : phone}</div>
            </li>
            <li>
              <label htmlFor="address">Address:</label>
              <div className="info-input">{isEditing ? <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} /> : address}</div>
            </li>
          </ul>
          {isEditing ? (
            <button className="save-button" onClick={handleSaveClick}>Save</button>
          ) : (
            <button className="edit-button" onClick={handleEditClick}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}
