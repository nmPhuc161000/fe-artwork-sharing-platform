import React, { useEffect, useState } from "react";
import "./CheckOrder.css";
import axios from "axios";
import urlApi from "../../../../../configAPI/UrlApi";
import ButtonStatus from "./buttonStatus/ButtonStatus";

export default function CheckOrder({ id }) {
  const [dataRequestById, setDataRequestById] = useState([]);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const axiosData = async () => {
      try {
        const response = await axios.get(
          `${urlApi}/api/RequestOrder/get-by-id?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.table(response.data);
        setDataRequestById(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error.request);
      }
    };
    axiosData();
  }, []);
  function formatTimeAgo(data) {
    const timeDifference = new Date() - new Date(data);
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    return `${hours} hours ago`;
  }

  const getStatus = (isActive, isDeleted) => {
    if (isDeleted) {
      return "Bị từ chối";
    } else {
      return !isActive ? "Được chấp nhận" : "Đang xử lý";
    }
  };

  if (isLoading) {
    return <div>You don't have any order</div>;
  };

  // Nếu không có dữ liệu, hiển thị thông báo
  if (!dataRequestById) {
    return <div>Không có tin nhắn từ người khác</div>;
  };

  const isActive = dataRequestById.isActive; 
  const isDeleted = dataRequestById.isDeleted

  return (
    <div className="checkorder">
      <div className="title">
        <section>
          <p style={{ textAlign: "left" }}>
            From: {dataRequestById.fullName_Sender}
          </p>
          <p style={{ textAlign: "left" }}>
            To: {dataRequestById.fullName_Receivier}
          </p>
        </section>
        <section>
          <p style={{ textAlign: "right" }}>
            {formatTimeAgo(dataRequestById.createdAt)}
          </p>
          <p style={{ textAlign: "right" }}>
            {getStatus(dataRequestById.isActive, dataRequestById.isDeleted)}
          </p>
        </section>
      </div>
      <div className="text">
        <section>
          <p>{dataRequestById.fullName_Sender} said: </p>
          <p>{dataRequestById.text}</p>
        </section>
      </div>
      <ButtonStatus id={id} isActive = {isActive} isDeleted = {isDeleted}/>
    </div>
  );
}
