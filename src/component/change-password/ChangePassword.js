import React, { useState } from 'react';
import './ChangePassword.css';
import axios from 'axios';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    console.log('Token:', token);

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await axios.put(
        'https://localhost:44306/api/Auth/change-password',
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Password changed successfully.');
        setErrorMessage('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        alert('Password changed successfully.');
      } else {
        throw new Error('Failed to change password');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to change password. Please try again later.');
    }
  };

  return (
    <div className="ChangePassword">
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div>
          <label htmlFor="currentPassword">Enter current password: </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
          />
        </div>
        <div>
          <label htmlFor="newPassword">Enter new password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm new password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}
