import React, { useState } from 'react';
import './RecoveryPassword.css'
const RecoveryPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi email khôi phục mật khẩu
        // Ở đây bạn có thể sử dụng một API hoặc một phương thức xử lý khôi phục mật khẩu khác
        // Ví dụ: fetch('/api/reset-password', { method: 'POST', body: { email }})
        setMessage(`An email with instructions to reset your password has been sent to ${email}.`);
        setEmail('');
    };

    return (
        <div className="recovery-password-container"> {/* Thêm class cho container của trang RecoveryPassword */}
            <h2>Reset your password</h2>
            <p className='recovery-password-remind'>Enter your Email and we’ll send a link to reset your password.</p>
            <div className='recovery-password-card'>
                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <input className="email-input" type="email" value={email} onChange={handleChange} required /> {/* Thêm class cho input */}
                    </label>
                    <button className="submit-button" type="submit">Send Email</button> {/* Thêm class cho button */}
                </form>
                <p className="message">{message}</p> {/* Thêm class cho phần thông báo */}
            </div>
        </div>
    );
};

export default RecoveryPassword;
