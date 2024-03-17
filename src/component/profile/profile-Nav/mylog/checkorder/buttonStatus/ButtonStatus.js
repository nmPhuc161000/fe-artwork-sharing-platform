import React from "react";
import "./ButtonStatus.css";
import axios from "axios";
import urlApi from "../../../../../../configAPI/UrlApi";

export default function ButtonStatus({ id }) {
  const token = localStorage.getItem("token");
  const handleCancel = async () => {
    try {
      const response = await axios.patch(
        `${urlApi}/api/RequestOrder/cancel-request?id=${id}`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error.request);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await axios.patch(
        `${urlApi}/api/RequestOrder/update-request?id=${id}`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error.request);
    }
  };
  return (
    <div className="buttonStatus">
      <button className="cancel" onClick={() => handleCancel()}>
        Cancel
      </button>
      <button className="custom-btn btn-3" onClick={() => handleAccept()}>
        <span>Accept</span>
      </button>
    </div>
  );
}
