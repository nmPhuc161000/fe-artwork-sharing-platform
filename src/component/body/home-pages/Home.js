import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Icon, Card, CardTitle } from "react-materialize";
import axios from "axios";
import { CardHome } from "../cardhome/CardHome";

export default function Home() {
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    const artData = async () => {
      try {
        const response = await axios.get("https://localhost:44306/api/Artwork/get-all");
        setItemData(response.data);
        console.log("Data from API: ", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    artData();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
 return (
    <div className="container-fluid">
      <Slider {...settings}>
          {itemData.map((item, index) => (
            <div key={index} className="slider-item">
              <img className="slider-image" src={item.img} alt={item.title} />
            </div>
          ))}
        </Slider>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(19%, 1fr))",
          gap: "10px",
          justifyContent: "center", // Để căn giữa
          width: "90%",
          margin: "0 auto", // Để thẻ div nằm giữa trang
        }}
      >
        {itemData.map((item) => (
          <div key={item.id}>
            <Link to={item && item.id ? `/detail/${item.id}` : '/fallback-path'} style={{color:'black'}}>
              <CardHome item={item}/>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}