import React, { useState, useEffect } from 'react';
import './TransactionHistory.css'
import axios from 'axios';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        // Gọi API để lấy lịch sử giao dịch
        axios.get('https://localhost:44306/api/Order/get-payment-history', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                // Nếu dữ liệu lịch sử giao dịch được trả về thành công, cập nhật state
                const updatedTransactions = response.data.map((transaction, index) => ({
                    ...transaction,
                    id: index + 1, // Sử dụng index của mảng để tạo id
                }));
                setTransactions(updatedTransactions);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Error fetching transaction history:', error);
            });
    }, []);

    return (
        <div className="transaction-history">
            <h2>Transaction History</h2>
            <div className='table-body'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => {
                            console.log('nick_Name:', transaction.NickName_Buyer);
                            return (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.name}</td>
                                <td><img src={transaction.url_Image} style={{ width: '50px', height: '50px' }} /></td>
                                <td>${transaction.price}</td>
                            </tr>
                            );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionHistory;
