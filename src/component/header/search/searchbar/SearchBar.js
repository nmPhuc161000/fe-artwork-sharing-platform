import React, { useState } from "react";
import { Icon } from "react-materialize";
import "./SearchBar.css";
import axios from "axios";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const axiosData = (value) => {
    axios("https://localhost:44306/api/Auth/users")
      .then((response) => {
        console.log("API Response:", response.data);
        const users = response.data; // Sử dụng mảng mặc định nếu không có dữ liệu trả về
        const result = users.filter((user) => {
          return (
            value &&
            user &&
            user.userName &&
            user.userName.toLowerCase().includes(value)
          );
        });
        console.log(result);
        setResults(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    axiosData(value);
  };

  return (
    <div className="searchBar">
      <Icon>search</Icon>
      <input
        placeholder="Search"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
