import React, { useState, useEffect } from "react";
import "./TransactionHistory.css";
import axios from "axios";
import urlApi from "../../../configAPI/UrlApi";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const historyData = async () => {
      try {
        const response = await axios.get(
          `${urlApi}/api/Order/get-payment-history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Data transaction: ", response.data);
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    };
    historyData();
  }, []);
  console.log(transactions);
  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <div className="table-body">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name seller</th>
              <th>Image</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{transaction.nickName_Seller}</td>
                <td>
                  <img
                    src={transaction.url_Image}
                    style={{ width: "50px", height: "50px" }}
                    alt=""
                  />
                </td>
                <td>${transaction.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
