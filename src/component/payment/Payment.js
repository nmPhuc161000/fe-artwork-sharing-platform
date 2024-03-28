import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Payment.css";
import urlApi from "../../configAPI/UrlApi";
import axios from "axios";
import Swal from "sweetalert2";

const Payment = ({ userById }) => {
  const { imageUrl, price } = useParams();
  const [imageSize, setImageSize] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [dataPay, setDataPay] = useState(null);
  const [callApi, setCallApi] = useState(false);
  const [status, setStatus] = useState([]);

  const token = localStorage.getItem("token");

  const handlePaypalClick = async () => {
    // Hiển thị thông tin khi nhấn vào logo Paypal
    try {
      const response = await axios.post(
        `${urlApi}/api/Payment/create-payment?amount=${userById.price}`,
        {},
        {
          headers: {
            // Thêm thông tin xác thực nếu cần
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataPay(response.data);
      setShowPaymentInfo(true);
      const selfLink = response.data.order.links.find(
        (link) => link.rel === "self"
      );
      setCallApi(selfLink);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleProceedToPayment = async () => {
    const approveLink = dataPay.order.links.find(
      (link) => link.rel === "approve"
    );

    if (approveLink) {
      // Thiết lập kích thước và vị trí của cửa sổ popup
      const popupWidth = 600;
      const popupHeight = 400;
      const left = window.screenX + (window.innerWidth - popupWidth) / 2;
      const top = window.screenY + (window.innerHeight - popupHeight) / 2;

      // Các thuộc tính của cửa sổ popup
      const popupOptions = `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable,scrollbars=yes,status=1`;

      // Mở liên kết trong cửa sổ popup
      window.open(approveLink.href, "_blank", popupOptions);
    } else {
      console.error("No approve link found in the response.");
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    let intervalId;
    const dataCapture = async () => {
      try {
        const response = await axios.get(callApi.href, {
          headers: {
            Authorization: `Bearer ${dataPay.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response.data.status);
        setStatus(response.data.status);
      } catch (error) {
        console.log(error);
      }
    };
    const startInterval = () => {
      intervalId = setInterval(() => {
        if (callApi) {
          dataCapture();
        }
      }, 7000); // 10 seconds interval

      // Đảm bảo gọi API ngay khi useEffect được gọi lần đầu tiên
      if (callApi) {
        dataCapture();
      }
    };

    startInterval();

    // Clear interval khi component unmount hoặc callApi thay đổi
    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    if (status === "APPROVED") {
      const captureLink = dataPay.order.links.find(
        (link) => link.rel === "capture"
      );

      const dataCapture = async () => {
        try {
          const response = await axios.post(
            captureLink.href,
            {},
            {
              headers: {
                Authorization: `Bearer ${dataPay.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);
          if (response.data.status === "COMPLETED") {
            Swal.fire({
              icon: "success",
              title: "Payment successful!",
              showConfirmButton: false,
              timer: 4000,
              confirmButtonText: 'OK',
              didClose: () => {
                navigate(`/detail/${userById.id}`);
              },
            });
          } else if(response.data.status !== "COMPLETED") {
            Swal.fire({
              icon: "error",
              title: "Payment failed!",
              text: 'There was an error processing your payment.',
              confirmButtonText: 'OK',
              showConfirmButton: false,
              timer: 4000,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      dataCapture();
    }
  }, [status]);

  useEffect(() => {
    console.log("Payment component mounted");
    const loadImage = async () => {
      const img = new Image();
      img.onload = function () {
        setImageSize({ width: this.width, height: this.height });
        setImageLoaded(true);
      };
      img.src = decodeURIComponent(userById.url_Image);
    };
    loadImage();
  }, [userById.url_Image]);

  return (
    <div className="PaymentPage">
      <div className="container-payment">
        <div className="center">
          {/* <hr style={{ border: '1px solid #ccc', margin: '0 15px' }} /> */}
          <h3>Choose Payment Method</h3>
          <div className="pay">
            <button onClick={handlePaypalClick}>
              <img
                src="https://i.ibb.co/KVF3mr1/paypal.png"
                alt="ZaloPay Logo"
                className="zalopay-logo"
              />
              <p className="name">Paypal</p>
            </button>
          </div>
          {showPaymentInfo /* Hiển thị thông tin khi showPaymentInfo là true */ && (
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
          <div className="price-info">
            <p>Summary</p>
          </div>
          {imageLoaded && (
            <div className="details-img">
              <img src={userById.url_Image} alt="Product" />
              <p>
                Image Size: {imageSize.width}x{imageSize.height}
              </p>
            </div>
          )}
          <div className="total">
            <p>Total: </p>
            <div className="price">
              <strong>{userById.price}$</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
