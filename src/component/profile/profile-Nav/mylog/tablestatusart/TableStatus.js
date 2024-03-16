import React, { useEffect, useState } from "react";
import './TableStatus.css';
import axios from "axios";
import urlApi from "../../../../../configAPI/UrlApi";
import { Checkbox, Icon } from "react-materialize";

export default function TableStatus() {
  const [artworks, setArtworks] = useState([]);
  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const [isAnyArtworkSelected, setIsAnyArtworkSelected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${urlApi}/api/Artwork/get-by-userId`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "*/*",
            },
          }
        );
        setArtworks(response.data);
        console.table(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to only run once on component mount

  useEffect(() => {
    setIsAnyArtworkSelected(selectedArtworks.length > 0);
  }, [selectedArtworks]);

  const getStatus = (isActive, isDeleted) => {
    if (isDeleted) {
      return "Bị từ chối";
    } else {
      return isActive ? "Được chấp nhận" : "Đang xử lý";
    }
  };

  const handleSelectArtwork = (artworkId) => {
    const isSelected = selectedArtworks.includes(artworkId);
    if (isSelected) {
      setSelectedArtworks(selectedArtworks.filter((id) => id !== artworkId));
    } else {
      setSelectedArtworks([...selectedArtworks, artworkId]);
    }
  };
  const token = localStorage.getItem("token");

  const handleDeleteSelectedArtworks = async () => {
    try {
      const response = await axios.delete(
        `${urlApi}/api/Artwork/delete-by-id-select`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
          data: selectedArtworks, // Chuyển dữ liệu vào trong phần data
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.request);
    }
  };

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Name Artwork</th>
            <th>Image</th>
            <th>Price</th>
            <th>Reason Refuse</th>
            <th>Status</th>
            <th style={{
                width: "85px"
            }}>
              {isAnyArtworkSelected ? (
                <Icon
                  onClick={handleDeleteSelectedArtworks}
                  style={{ cursor: "pointer" }}
                >
                  delete
                </Icon>
              ) : (
                "Select"
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {artworks.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>
                <img
                  src={item.url_Image}
                  alt="Artwork"
                  style={{ width: "50px", height: "60px" }}
                />
              </td>
              <td>{item.price}</td>
              <td>{item.reasonRefuse}</td>
              <td>{getStatus(item.isActive, item.isDeleted)}</td>
              <td>
                <Checkbox onChange={() => handleSelectArtwork(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}