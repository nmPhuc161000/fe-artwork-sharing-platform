import React from 'react';
import { Link } from 'react-router-dom';

function ProfileNav() {
  return (
    <nav className="profile-nav">
      <ul>
        <li><Link to="/profile/favourites">Favorites</Link></li>
        <li><Link to="/profile/shop">Shop</Link></li>
        <li><Link to="/profile/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default ProfileNav;
