import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CardHome } from "../cardhome/CardHome";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const ListArtwork = ({ itemData }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = ["Dragon", "Galaxy", "AI", "Landscape", "Fantasy"];
  const [sortBy, setSortBy] = useState(null); 

  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  const handleSortByClick = (event) => {
    const selectedOption = event.target.value;
    setSortBy(selectedOption);
  };

  const filteredItems = itemData.filter((item) =>
    selectedCategory ? item.category_Name === selectedCategory : true
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "asc") {
      return a.price - b.price;
    } else if (sortBy === "desc") {
      return b.price - a.price;
    }
    return 0; // Không sắp xếp
  });

  return (
    <div className="container-fluid">
      <div
        className="category-bar"
        style={{
          margin: "15px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "90%", marginBottom: "5px", height: "40px" }}>
          <FormControl sx={{ m: 1, minWidth: 120, margin: 0}} style={{height: "100%"}} size="small">
            <InputLabel id="demo-select-small-label">Sort Price</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={sortBy}
              label="Sort"
              onChange={handleSortByClick}
              sx={{ backgroundColor: "white" }}
              style={{height: "100%"}}
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={"asc"}>Increase</MenuItem>
              <MenuItem value={"desc"}>Decrease</MenuItem>
            </Select>
          </FormControl>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              style={{
                fontWeight: category === selectedCategory ? "bold" : "normal",
                marginLeft: "10px",
                border: "1px solid #b6b7be",
                borderRadius: "4px",
                backgroundColor: "white",
                padding: "5px 15px",
                cursor: "pointer",
                height: "100%",
                fontSize: "17px"
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
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
        {sortedItems.map((item) => (
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
};
