import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import './SortButton.css'
import axios from "axios";

const SortButton = () => {
  const [sortBy, setSortBy] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  
  const axiosData = (sortBy) => {
    axios.post(`https://localhost:44306/api/Artwork/search?sortBy=${sortBy}`, {},
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("API Response:", response.data);
        navigate(`/searchlist`, { state: { searchData: response.data } });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSort = (ascending) => {
    const newSortBy = ascending ? 'price_asc' : 'price_desc';
    setSortBy(newSortBy);
    axiosData(newSortBy);
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="sortButton">
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Sort By
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSort(true)}>Tăng dần</MenuItem>
        <MenuItem onClick={() => handleSort(false)}>Giảm dần</MenuItem>
      </Menu>
    </div>
  );
};

export default SortButton;
