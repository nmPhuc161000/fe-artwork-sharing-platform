import React from "react";
import "./ButtonStatus.css";

export default function ButtonStatus() {
  return (
    <div className="buttonStatus">
        <button className="cancel">Cancel</button>
        <button className="custom-btn btn-3"><span>Accept</span></button>
    </div>
  );
}
