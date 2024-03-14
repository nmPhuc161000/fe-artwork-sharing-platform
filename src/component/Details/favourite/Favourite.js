import React, { useState, useEffect } from "react";
import "./Favourite.css";
import urlApi from '../../configAPI/UrlApi'
import { Icon } from "react-materialize";
import axios from "axios";

export default function Favourite({itemData}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [dataFavourite, setDataFavourite] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Retrieve the saved favorite state from localStorage on component mount
    const savedFavorite = localStorage.getItem(`favorite_${itemData.id}`);
    if (savedFavorite !== null) {
      setIsFavorite(savedFavorite === "true");
    }
  }, [itemData.id]);

  const toggleFavorite = async () => {
    try {
      if (!isFavorite) {
        await axios.post(
          `${urlApi}/api/Favourite/add-favourite?artwork_Id=${itemData.id}`,
          {},  // Add an empty object for the request body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((response) => {
          setDataFavourite(response);
        });
        console.log("Added to favorites successfully");
      } else {
        await axios.delete(
          `${urlApi}/api/Favourite/remove-artwork?favourite_Id=${dataFavourite.favourite_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Removed from favorites successfully");
      }

      const newFavoriteState = !isFavorite;
      setIsFavorite(newFavoriteState);
      localStorage.setItem(`favorite_${itemData.id}`, String(newFavoriteState));
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  return (
    <div className="product-favorite">
      {/* Hiển thị nút favorite hoặc nút add vào yêu thích tùy thuộc vào trạng thái isFavorite */}
      {isFavorite ? (
        <button onClick={toggleFavorite}>
          <Icon>favorite</Icon>{" "}
          {/* Icon hiển thị khi sản phẩm đã được thêm vào yêu thích */}
          <span>In Favorites</span>
        </button>
      ) : (
        <button onClick={toggleFavorite}>
          <Icon>favorite_border</Icon>{" "}
          {/* Icon hiển thị khi sản phẩm chưa được thêm vào yêu thích */}
          <span>Add to Favourites</span>
        </button>
      )}
    </div>
  );
}
