import React, { useState } from "react";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }

    // Thực hiện logic để thay đổi mật khẩu ở đây
    console.log("Changing password...");
    setErrorMessage(""); // Xóa thông báo lỗi nếu có
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="ChangePassword">
      <h2>Change Password</h2>
      <div>
        <label htmlFor="currentPassword">Nhập mật khẩu cũ: </label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newPassword">Nhập mật khẩu mới:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Nhập lại mật khẩu mới:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default ChangePassword;
