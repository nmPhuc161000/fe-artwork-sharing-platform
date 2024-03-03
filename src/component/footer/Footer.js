import React from 'react'
import './Footer.css'
function Footer({ isLoginPage, isRegisterPage }) { // Thêm isRegisterPage vào props
  if (isLoginPage || isRegisterPage) { // Ẩn footer nếu là trang Login hoặc Register
    return null;
  }

  const urlLogo = "https://firebasestorage.googleapis.com/v0/b/artwork-platform.appspot.com/o/logo%2Ffeed6075-55fd-4fb3-98d4-946d30029eda?alt=media&token=a3dd9363-73f3-4aec-ae32-264c761a0c0f";

  return (
    <div className='footer-content'>
      <img src={urlLogo} alt='logo' className='footer-logo' />
      <div className="footer-info">
        <h3>Info</h3>
        <ul>
          <li>Courses</li>
          <li>Schedule</li>
          <li>Pricing</li>
          <li>Teachers</li>
        </ul>
      </div>
      <div className="footer-about">
        <h3>About</h3>
        <ul>
          <li>Blog</li>
          <li>About us</li>
        </ul>
      </div>
      <div className="footer-contact">
        <h3>Contact us.</h3>
        <p>Address: Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000</p>
        <p>Phone No: +84 123 456789</p>
        <p>Email: baokk254952@fpt.edu.vn</p>
      </div>
    </div>
  );
}

export default Footer;