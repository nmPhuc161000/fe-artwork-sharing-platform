// Trong Profile.js
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import ProfileNav from './profile-Nav/ProfileNav';
import About from './profile-Nav/about/About';

function Profile() {

  return (
    <div className="profile">
      <ProfileNav />
    </div>
  );
}

export default Profile;
