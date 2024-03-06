import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./SearchList.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const SearchList = () => {
  const { state } = useLocation();
  const responseData = state && state.searchData;
  const responseDataArray = Array.isArray(responseData) ? responseData : [];
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

  const filteredItems = responseDataArray.filter((item) =>
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
    <div>
      <div
        className="category-bar"
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "40px"
        }}
      >
        <div style={{ width: "90%", height: "100%" }}>
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
        className="searchdropdown"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(19%, 1fr))",
          gap: "10px",
          justifyContent: "center", // Để căn giữa
          width: "90%",
          margin: "0 auto", // Để thẻ div nằm giữa trang
        }}
      >
        {sortedItems
          .map((item) => (
            <div key={item.id} style={{ height: "320px" }}>
              <Link
                to={item && item.id ? `/detail/${item.id}` : "/fallback-path"}
                style={{ color: "black" }}
              >
                {/* <CardHome item={item}/> */}
                <div
                  className="cardHome"
                  style={{
                    boxShadow:
                      "3px 4px 2px 2px rgba(0, 0, 0, 0.1), 3px 6px 3px 6px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div className="cardImg" style={{height:"75%", width:"100%"}}>
                    <img
                      src={item.url_Image}
                      alt=""
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                  <div className="cardInfor">
                    <div className="cardName">
                      <div>
                        <strong>{item.name}</strong>
                      </div>
                      <div>
                        By <strong>{item.user_Name}</strong>
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
  );
};
