import React from "react";
import "./DeleteSent.css";
import { Icon } from "react-materialize";
import axios from "axios";
import urlApi from "../../../../configAPI/UrlApi";

export default function DeleteSent({ note, setUpdateDe }) {
  const token = localStorage.getItem("token");
  const handleDeSentReq = async () => {
    try {
      const response = await axios.delete(
        `${urlApi}/api/RequestOrder/delete-request?id=${note.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setUpdateDe(response);
    } catch (error) {
        console.error(error.message);
    }
  };
  return (
    <div className="deSentReq" onClick={() => handleDeSentReq()}>
      <button>
        <Icon>delete</Icon>
      </button>
    </div>
  );
}
