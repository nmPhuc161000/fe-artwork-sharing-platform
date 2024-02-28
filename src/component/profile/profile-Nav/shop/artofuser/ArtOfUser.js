import React, { useState, useEffect } from "react";
import './ArtOfUser.css';
import { Link } from "react-router-dom";
import axios from "axios";

export default function ArtOfUser() {
    const [itemData, setItemData] = useState([]);

    useEffect(() => {
      const artData = async () => {
        try {
          const response = await axios.get("https://localhost:44306/api/Artwork/get-by-userId");
          setItemData(response.data);
          console.log("Data from API: ", response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      artData();
    }, []);
  
    return (
      <div className="container-fluid">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(19%, 1fr))",
            gap: "10px",
            justifyContent: "center", // Để căn giữa
            width: "90%",
            margin: "0 auto", // Để thẻ div nằm giữa trang
          }}
        >Helo
          {itemData.map((item) => (
            <div key={item.id}>
              <Link to={item && item.id ? `/detail/${item.id}` : '/fallback-path'} style={{color:'black'}}>
                
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
}
