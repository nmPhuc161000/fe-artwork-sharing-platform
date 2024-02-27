import React, { useState } from 'react'
export default function Payment() {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Xử lý dữ liệu thanh toán dựa trên phương thức thanh toán được chọn
        if (paymentMethod === 'creditCard') {
            // Xử lý thanh toán bằng thẻ tín dụng
            console.log('Processing payment via credit card...');
            console.log('Card Number:', formData.cardNumber);
            console.log('Expiry Date:', formData.expiryDate);
            console.log('CVV:', formData.cvv);
        } else if (paymentMethod === 'momo') {
            // Xử lý thanh toán qua Momo
            console.log('Processing payment via Momo...');
        } else {
            console.log('Please select a payment method.');
        }
    };

    return (
        <div>
            <h1>Payment Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Payment Method:
                    <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                        <option value="">Choose Payment Method</option>
                        <option value="creditCard">Credit Card</option>
                        <option value="momo">Momo</option>
                    </select>
                </label>
                {/* Hiển thị các trường dữ liệu tùy thuộc vào phương thức thanh toán */}
                {paymentMethod === 'creditCard' && (
                    <div>
                        <label>
                            Card Number:
                            <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Expiry Date:
                            <input
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            CVV:
                            <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                )}
                <button type="submit">Submit Payment</button>
            </form>
        </div>
    );
}