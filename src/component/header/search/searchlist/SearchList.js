import React, { useState, useEffect } from "react";
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
  const categories = ["Dragon", "Galaxy", "AI", "Landscape", "Fantasy", "Home"];
  const [sortBy, setSortBy] = useState(null);
  const [rowArtWidth, setRowArtWidth] = useState(0);

  useEffect(() => {
    const updateRowArtWidth = () => {
      const rowArtElement = document.querySelector('.row-art');
      if (rowArtElement) {
        setRowArtWidth(rowArtElement.offsetWidth);
      }
    };
    updateRowArtWidth();
    window.addEventListener('resize', updateRowArtWidth);
    return () => window.removeEventListener('resize', updateRowArtWidth);
  }, []);

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

  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div>
      <div
        className="category-bar"
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "40px",
        }}
      >
        <div style={{ width: "90%", height: "100%" }}>
          <FormControl
            sx={{ m: 1, minWidth: 120, margin: 0 }}
            style={{ height: "100%" }}
            size="small"
          >
            <InputLabel id="demo-select-small-label">Sort Price</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={sortBy}
              label="Sort"
              onChange={handleSortByClick}
              sx={{ backgroundColor: "white" }}
              style={{ height: "100%" }}
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
                fontSize: "17px",
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="row-art"
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            width: "96%",
          }}
        >
          {sortedItems.map((item) => (
            <Link
              to={item && item.id ? `/detail/${item.id}` : "/fallback-path"}
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
                    maxWidth: rowArtWidth > 0 ? `${rowArtWidth / 3}px` : "100%",
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
  );
};
