import React from "react";
import "./SearchList.css";

export const SearchList = ({ results }) => {
  return (
    <div className="searchlist">
      {results.map((result, id) => (
        <div className="results" key={id}>
          {result.userName}
        </div>
      ))}
    </div>
  );
};
