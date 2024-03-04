import React, { useState, useEffect } from "react";
import "./ArtOfUser.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ArtOfUser() {
  const [itemData, setItemData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const artData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44306/api/Artwork/get-by-userId", {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: '*/*'
            }
          }
        );
        setItemData(response.data);
        console.log("Data from API: ", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    artData();
  }, [itemData]);

  return (
    <div className="container-fluid" style={{height:"100%"}}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "10px",
          justifyContent: "center", // Để căn giữa
          width: "100%",
          height:"100%",
          margin: "0 auto", // Để thẻ div nằm giữa trang
          marginLeft: "15px"
        }}
      >
        {itemData.map((item) => (
          <div key={item.id}>
            <Link
              to={item && item.id ? `/detail/${item.id}` : "/fallback-path"}
              style={{ color: "black" }}
            >
              <div className="cardHome" style={{height:"326px", width:"auto", boxShadow: "3px 4px 2px 2px rgba(0, 0, 0, 0.1), 3px 6px 3px 6px rgba(0, 0, 0, 0.06)"}}>
                <div className="cardImg">
                  <img src={item.url_Image} alt="" style={{height:"95%", width:"100%"}}/>
                </div>
                <div className="cardInfor">
                  <div className="cardName">
                    <div>
                      <strong>{item.name}</strong>
                    </div>
                    <div>By {item.user_Name}</div>
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
  );
}