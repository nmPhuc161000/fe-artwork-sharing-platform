import React from 'react';
import { Link } from 'react-router-dom';

function ProfileNav() {
  return (
    <nav className="profile-nav">
      <ul>
        <li><Link to="/favorites">Favorites</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default ProfileNav;
