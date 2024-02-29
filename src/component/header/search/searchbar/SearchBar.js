import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import './SearchBar.css';
import { Icon } from "react-materialize";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SearchBar = () => {
  const [inputValue, setInput] = useState("");
  const [option, setOption] = useState("");
  const [responseData, setResponseData] = useState(null);
  const navigate  = useNavigate ();


  const token = localStorage.getItem('token');
  const axiosData = (inputValue, option) => {
    axios.post(`https://localhost:44306/api/Artwork/search?search=${inputValue}&saerchBy=${option}`, {},
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // // window.location.href = "/searchlist";
        console.log("API Response:", response.data);
        // console.log("API URL:", apiUrl);
        setResponseData(response.data);

      // Redirect to SearchList with data
      navigate(`/searchlist`, { state: { searchData: response.data } });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    console.log(inputValue);
  };

  const handleOption = (event) => {
    const selectedOption = event.target.value;
    setOption(selectedOption);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      axiosData(inputValue, option);
    }
  };

  return (
    <div className="searchBar">
      <Icon style={{ marginLeft: "10px" }}>search</Icon>
      <input
        placeholder="TSearch"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">SearchBy</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={option}
          onChange={handleOption}
          label="Age"
        >
          <MenuItem value="">
            <em>Name Artwork</em>
          </MenuItem>
          <MenuItem value={"category_name"}>Category</MenuItem>
          <MenuItem value={"user_name"}>Creator Name</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SearchBar;
