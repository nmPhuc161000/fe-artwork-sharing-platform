import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { ListArtwork } from "../list-artwork/ListArtwork";

// import Slider from "react-slick";

export default function Home() {
  const [itemData, setItemData] = useState([]);

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

  return (
    <>
      <ListArtwork itemData = {itemData}/>
    </>
  );
}
