import React from "react";
import { useLocation, Link } from "react-router-dom";
import {} from "react-router-dom";
import "./SearchList.css";

export const SearchList = () => {
  const { state } = useLocation();
  const responseData = state && state.searchData;
  const responseDataArray = Array.isArray(responseData) ? responseData : [];
  console.log(responseDataArray);

  return (
    <div className="searchdropdown"
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(19%, 1fr))",
      gap: "10px",
      justifyContent: "center", // Để căn giữa
      width: "90%",
      height: "320px",
      margin: "0 auto", // Để thẻ div nằm giữa trang
    }}>
      {responseDataArray.map((item) => (
        <div key={item.id} style={{height:"320px"}}>
          <Link
            to={item && item.id ? `/detail/${item.id}` : "/fallback-path"}
            style={{ color: "black" }}
          >
            {/* <CardHome item={item}/> */}
            <div className="cardHome" style={{boxShadow: "3px 4px 2px 2px rgba(0, 0, 0, 0.1), 3px 6px 3px 6px rgba(0, 0, 0, 0.06)"}}>
              <div className="cardImg">
                <img src={item.url_Image} alt="" style={{height:"100%", width:"100%"}}/>
              </div>
              <div className="cardInfor">
                <div className="cardName">
                  <div>
                    <strong>{item.name}</strong>
                  </div>
                  <div>By <strong>{item.user_Name}</strong></div>
                </div>
                <div className="cardPrice">
                  <div>
                    <strong>{item.price}</strong>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
