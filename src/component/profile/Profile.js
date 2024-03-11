import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProfileNav from "./profile-Nav/ProfileNav";
import About from "./profile-Nav/about/About";
import { Shop } from "./profile-Nav/shop/Shop";
import Favourites from "./profile-Nav/favourites/Favourites";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState([]);
  const [userIsUpdate, setUsetIsUpdate] = useState("");
  const token = localStorage.getItem("token");
  const userInfor = user.userInfo;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          "https://localhost:44306/api/Auth/me",
          { token: token }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserData();
  }, [userIsUpdate]);

  const handleEditFilm = () => {
    setUsetIsUpdate((prev) => !prev);
  };

  return (
    <div className="profile">
      <ProfileNav />
      <Routes>
        <Route path="favourites" element={<Favourites />}></Route>
        <Route path="about" element={userInfor ? <About userInfor={userInfor} onUpdate={handleEditFilm}/> : null}/>
        <Route path="shop" element={<Shop />} />
      </Routes>
    </div>
  );
}

export default Profile;
