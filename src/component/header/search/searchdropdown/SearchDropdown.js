import React from "react";
import "./SearchLisDropdown.css";

export const SearchDropdown = ({ results }) => {
  return (
    <div className="searchdropdown">
      {results.map((result, id) => (
        <div className="results" key={id}>
          {result.name}
        </div>
      ))}
    </div>
  );
};
