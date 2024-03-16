import React, { useEffect, useState } from "react";
import "./CheckOrder.css";
import axios from "axios";
import urlApi from "../../../../configAPI/UrlApi";
import ButtonStatus from "./buttonStatus/ButtonStatus";

export default function CheckOrder({ id }) {
  const [dataRequestById, setDataRequestById] = useState([]);
  const token = localStorage.getItem("token");
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
      } catch (error) {
        console.error(error.request);
      }
    };
    axiosData();
  });
  function formatTimeAgo(data) {
    const timeDifference = new Date() - new Date(data);
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    return `${hours} hours ago`;
  }
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
        </section>
      </div>
      <div className="text">
        <section>
          <p>{dataRequestById.fullName_Sender} said: </p>
          <p>{dataRequestById.text}</p>
        </section>
      </div>
        <ButtonStatus />
    </div>
  );
}
