import React, { useState } from "react";
import { Icon } from "react-materialize";
import "./SearchBar.css";
import axios from "axios";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const axiosData = (value) => {
    axios("https://localhost:44306/api/Auth/users")
      .then((response) => {
        const users = response.data; // Assuming response.data is an array of users
        const result = users.filter((user) => {
          return (
            value &&
            user &&
            user.userName &&
            user.userName.toLowerCase().includes(value)
          );
        });
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
