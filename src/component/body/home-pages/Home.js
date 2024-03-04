import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { CardHome } from "../cardhome/CardHome";
// import Slider from "react-slick";

export default function Home() {
  const [itemData, setItemData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = ["Dragon", "Galaxy", "AI", "Landscape", "Fantasy"];

  useEffect(() => {
    const artData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44306/api/Artwork/get-all"
        );
        setItemData(response.data);
        // console.log("Data from API: ", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    artData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };
  const filteredItems = itemData.filter((item) =>
    selectedCategory ? item.category_Name === selectedCategory : true
  );

  return (
    <div className="container-fluid">
      <div
        className="category-bar"
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "90%" }}>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              style={{
                fontWeight: category === selectedCategory ? "bold" : "normal",
                marginRight: "10px",
                border: "1px solid #b6b7be",
                borderRadius: "4px",
                backgroundColor: "white",
                padding: "10px 15px",
                cursor: "pointer",
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {/* <Slider {...settings}>
          {itemData.map((item, index) => (
            <div key={index} className="slider-item">
              <img className="slider-image" src={item.url_Image} alt={item.title} />
            </div>
          ))}
        </Slider> */}
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
        {filteredItems.map((item) => (
          <div key={item.id} style={{ height: "320px" }}>
            <Link
              to={item && item.id ? `/detail/${item.id}` : "/fallback-path"}
              style={{ color: "black" }}
            >
              <CardHome item={item} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
