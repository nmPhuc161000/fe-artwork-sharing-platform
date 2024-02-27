import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Icon, Col, Card, Row, CardTitle } from "react-materialize";
import axios from "axios";

export default function Home() {
  // const [itemData, setItemData] = useState([]);

  // useEffect(() => {
  //   const artData = async () => {
  //     const token = localStorage.getItem("token");
  //     try {
  //       const response = await axios.get("https://localhost:44306/api/Artwork/get-all", {
  //         headers: {
  //             'Authorization': `Bearer ${token}`
  //         }
  //     });
  //       setItemData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   artData();
  // }, []);

  // const handleConsoleLog = () => {
  //   console.log("Current itemData:", itemData);
  // };

  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
      title: "Bed",
    },
    {
      img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
      title: "Kitchen",
    },
    {
      img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
      title: "Sink",
    },
    {
      img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
      title: "Books",
    },
    {
      img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
      title: "Chairs",
    },
    {
      img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
      title: "Candle",
    },
    {
      img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
      title: "Laptop",
    },
    {
      img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
      title: "Doors",
    },
    {
      img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
      title: "Coffee",
    },
    {
      img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
      title: "Storage",
    },
    {
      img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
      title: "Coffee table",
    },
    {
      img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
      title: "Blinds",
    },
  ];

  return (
    <div className="container-fluid">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(19%, 1fr))",
          gap: "10px",
          justifyContent: "center", // Để căn giữa
          width: "90%",
          margin: "0 auto", // Để thẻ div nằm giữa trang
        }}
      >
        {itemData.map((item) => (
          <div key={item.id}>
            <Link to={"/detail"}>
              <Card
                closeIcon={<Icon>close</Icon>}
                header={<CardTitle image={item.img} reveal waves="light" />}
                title={item.title}
              ></Card>
            </Link>
          </div>
        ))}
      </div>
      {/* <button onClick={handleConsoleLog}>
        Log itemData to console
      </button> */}
    </div>
  );
}

