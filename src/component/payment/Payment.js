import React from 'react';
import { useParams } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const { imageUrl } = useParams();
  console.log("Image URL:", imageUrl);
  const handlePayNow = (e) => {
    e.preventDefault();
    // Xử lý thanh toán tại đây
    console.log('Payment processing...');
    
  };

  return (
    <div className='PaymentPage'>
      <div className="container-payment">
        <div className="left">
          <p>Payment methods</p>
          <hr style={{ border: '1px solid #ccc', margin: '0 15px' }} />
          <div className="methods">
            <div style={{ color: 'greenyellow' }}><i className="fas fa-credit-card" style={{ color: 'greenyellow' }}></i> Payment by card</div>
            <div><i className="fas fa-building-columns"></i>Paypal</div>
          </div>
          <hr style={{ border: '1px solid #ccc', margin: '0 15px' }} />
        </div>
        <div className="center">
          <a href="https://www.shift4shop.com/credit-card-logos.html"><img alt="Credit Card Logos" title="Credit Card Logos" src="https://www.shift4shop.com/images/credit-card-logos/cc-lg-4.png" width="250" height="auto" /></a>
          <hr style={{ border: '1px solid #ccc', margin: '0 15px' }} />

          <div className="card-details">
            <form onSubmit={handlePayNow}>
              <p>Card number</p>
              <div className="c-number" id="c-number">
                <input id="number" className="cc-number" placeholder="Card number" maxLength="19" required />
                <i className="fas fa-credit-card" style={{ margin: '0' }}></i>
              </div>

              <div className="c-details">
                <div>
                  <p>Expiry date</p>
                  <input id="e-date" className="cc-exp" placeholder="MM/YY" required maxLength="4" />
                </div>
                <div>
                  <p>CVV</p>
                  <div className="cvv-box" id="cvv-box">
                    <input id="cvv" className="cc-cvv" placeholder="CVV" required maxLength="3" />
                    <i className="fas fa-circle-question" title="3 digits on the back of the card" style={{ cursor: 'pointer' }}></i>
                  </div>
                </div>
              </div>
              <p>Email</p>
              <div className="emailPay">
                <input type="email" placeholder="example@email.com" id="email" required />
              </div>
              <button type="submit">PAY NOW</button>
            </form>
          </div>
        </div>
        <div className="right">
          <p>Order information</p>
          <div className="details-img">
            <img src={decodeURIComponent(imageUrl)} alt="Product" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
