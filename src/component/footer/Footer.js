import React from 'react'
import './Footer.css'
export default function Footer() {
  return (
    <div className='footer-content'>
      <img src='./assets/image/logo.png' alt='logo' className='footer-logo' />
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
  )
}
