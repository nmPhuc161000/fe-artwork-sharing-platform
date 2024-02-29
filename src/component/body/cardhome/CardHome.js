import React from "react";
import "./CardHome.css";

export const CardHome = (item) => {
  console.log(item);
  return (
    <div className="cardHome">
      <div className="cardImg">
        <img src={item.item.url_Image} style={{height:"auto", width:"100%"}} />
      </div>
      <div className="cardInfor">
        <div className="cardName">
          <div>
            <strong>{item.item.name}</strong>
          </div>
          <div>By {item.item.user_Name}</div>
        </div>
        <div className="cardPrice">
          <div>
            <strong>{item.item.price}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
