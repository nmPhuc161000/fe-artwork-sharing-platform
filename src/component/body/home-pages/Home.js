import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import Slider from "react-slick";
import { ListArtwork } from "../list-artwork/ListArtwork";

export default function Home() {
  const [itemData, setItemData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = ["Dragon", "Galaxy", "AI", "Landscape", "Fantasy"];

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
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
      <Slider
        dots={false}
        infinite={true}
        arrows={false}
        speed={500}
        slidesToShow={3}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={2000}
        swipe={false}
        draggable={false}

      >
        {filteredItems.slice(0, 6).map((item) => (
          <div key={item.id} className="slider-item">
            <img className="slider-image" src={item.url_Image} alt={item.title} />
          </div>
        ))}
      </Slider>
      <>
      <ListArtwork itemData = {itemData}/>
    </>
      <div
        className="category-bar"
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      </div>
    </div>
  );
}
