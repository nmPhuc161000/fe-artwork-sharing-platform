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
  },[]);
  const [hoveredItem, setHoveredItem] = useState(null);
  return (
    <div className="favourite">
      {/* hàm tạo ảnh và thêm thông tin */}
      <div className="content">
        <div className="commissions">
          <span>Your Favourites</span>
        </div>

        <div className="container-fluid" style={{ height: "100%" }}>
        <div
          className="row-art"
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            width: "93%",
          }}
        >
          {favourites.map((item) => (
            <Link
              to={item && item.artwork_Id ? `/detail/${item.artwork_Id}` : "/fallback-path"}
              style={{ color: "black", display: "block" }}
            >
              <div
                key={item.id}
                className="col-art"
                style={{ margin: "0 4px", position: "relative" }}
                onMouseEnter={() => item && setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <img
                  src={item.url_Image}
                  alt=""
                  style={{
                    marginTop: "4px",
                    maxWidth: "100%",
                    height: "255px",
                    objectFit: "cover",
                  }}
                />

                {hoveredItem === item && (
                  <div
                    className="image-info"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.4)",
                      padding: "8px",
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      right: "0",
                      color: "white",
                      height: "96.5%",
                      marginBottom: "5px",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                    }}
                  >
                    <section
                      style={{
                        margin: "10px",
                      }}
                    >
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          {item && item.name}
                        </span>
                      </p>
                      <p>
                        By:{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {item && item.full_Name}
                        </span>
                      </p>
                    </section>
                    <section
                      style={{
                        margin: "10px",
                      }}
                    >
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          {item && item.price}
                        </span>
                        K vnd
                      </p>
                    </section>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
