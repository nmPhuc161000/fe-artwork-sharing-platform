import React from "react";
import { Icon } from "react-materialize";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="navbar">
        <div className="search">
          <Icon>search</Icon>
        </div>
      </div>
    </>
  );
}
