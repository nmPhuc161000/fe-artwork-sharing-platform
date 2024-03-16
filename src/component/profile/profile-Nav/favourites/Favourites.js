import React, { useEffect, useState } from "react";
import "./Favourites.css";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Link } from "react-router-dom";
import urlApi from "../../../../configAPI/UrlApi";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const favouritesData = async () => {
      try {
        const response = await axios.get(`${urlApi}/api/Favourite/get-favourite`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavourites(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    favouritesData();
  });
  return (
    <div className="favourite">
      {/* hàm tạo ảnh và thêm thông tin */}
      <div className="content">
        <div className="commissions">
          <span>Your Favourites</span>
        </div>

        <div className="container-fluid" style={{ height: "100%" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "15px",
              justifyContent: "center", // Để căn giữa
              width: "100%",
              height: "100%",
              margin: "0 auto", // Để thẻ div nằm giữa trang
            }}
          >
            {favourites.map((item) => (
              <div key={item.id}>
                <Link
                  to={item && item.artwork_Id ? `/detail/${item.artwork_Id}` : "/fallback-path"}
                  style={{ color: "black" }}
                >
                  <div
                    className="cardShop"
                    style={{
                      height: "365px",
                      width: "auto",
                      boxShadow:
                        "3px 4px 2px 2px rgba(0, 0, 0, 0.1), 3px 6px 3px 6px rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    <div className="cardImg">
                      <img
                        src={item.url_Image}
                        alt=""
                        style={{ height: "95%", width: "100%" }}
                      />
                    </div>
                    <div className="cardInfor">
                      <div className="cardName">
                        <div>
                          <span style={{ fontWeight: "bold" }}>
                            {item.name}
                          </span>
                        </div>
                        <div>
                          By{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {item.user_Name}
                          </span>
                        </div>
                      </div>
                      <div className="cardPrice">
                        <div>
                          <strong>{item.price}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
