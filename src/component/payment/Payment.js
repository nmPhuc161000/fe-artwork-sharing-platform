import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Payment.css';
import urlApi from '../../configAPI/UrlApi';
import axios from 'axios';

const Payment = ({ item }) => {
  const { imageUrl, price } = useParams();
  const [imageSize, setImageSize] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  
  const token = localStorage.getItem("token");
  const handlePaypalClick = () => {
    setShowPaymentInfo(true); // Hiển thị thông tin khi nhấn vào logo Paypal
  };
  const handleProceedToPayment = async () => {
    try {
      const response = await axios.post(
        `${urlApi}/api/Payment/create-payment?amount=${price}`,
        {},
        {
          headers: {
            // Thêm thông tin xác thực nếu cần
            Authorization: `Bearer ${token}`
          }
        }
      );
      const data = response.data;
      const approveLink = data.order.links.find(link => link.rel === "approve");
      if (approveLink) {
        window.location.href = approveLink.href;
      } else {
        console.error("No approve link found in the response.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  useEffect(() => {
    console.log("Payment component mounted");
    const loadImage = async () => {
      const img = new Image();
      img.onload = function () {
        setImageSize({ width: this.width, height: this.height });
        setImageLoaded(true);
      };
      img.src = decodeURIComponent(imageUrl);
    }


    loadImage();
  }, [imageUrl]);

  return (
    <div className='PaymentPage'>
      <div className="container-payment">
        <div className="center">
          {/* <hr style={{ border: '1px solid #ccc', margin: '0 15px' }} /> */}
          <h3>Choose Payment Method</h3>
          <div className='pay'>
            <button onClick={handlePaypalClick}>
              <img src="https://i.ibb.co/KVF3mr1/paypal.png" alt="ZaloPay Logo" className="zalopay-logo" />
              <p className='name'>Paypal</p></button>
          </div>
          {showPaymentInfo && ( /* Hiển thị thông tin khi showPaymentInfo là true */
            <div className="card-details">
              <h4>You’ll be redirected to PayPal to complete this payment.</h4>
              <div>
                <button onClick={handleProceedToPayment}>
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="right">
          <div className='price-info'>
            <p>Summary</p>
          </div>
          {imageLoaded && (
            <div className="details-img">
              <img src={decodeURIComponent(imageUrl)} alt="Product" />
              <p>Image Size: {imageSize.width}x{imageSize.height}</p>
            </div>
          )}
          <div className='total'>
            <p>Total: </p>
            <div className='price'>
              <strong>{price}$</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;