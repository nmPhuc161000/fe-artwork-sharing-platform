import React from 'react';
import { useLocation } from 'react-router-dom';

function Shop() {
  // Lấy thông tin người dùng từ URL
  const location = useLocation();
  const user = location.state ? location.state.user : null;

  // Kiểm tra xem user có tồn tại hay không trước khi truy cập thuộc tính 'user'
  const { name, image } = user ? user : { name: '', image: '' };

  // Hiển thị nội dung cửa hàng của người dùng
  return (
    <div className="shop">
      {/* Avatar và tên người dùng */}
      <div className="user-info">
        <img src={image} alt="Avatar" />
        <h2>{name}</h2>
      </div>

      {/* Hiển thị sản phẩm của người dùng */}
      <h3>Sản phẩm của {name}</h3>
      {/* Hiển thị danh sách sản phẩm của người dùng ở đây */}
    </div>
  );
}

export default Shop;