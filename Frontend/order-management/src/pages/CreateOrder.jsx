import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import "../styles/gen.css";
import "../styles/animations.css";

const CreateOrder = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const itemName = urlParams.get("itemName") || "";
  const price = parseFloat(urlParams.get("price")) || 0;

  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    city: "",
    zipCode: "",
    deliveryDays: 5
  });
  const [totalAmount, setTotalAmount] = useState(price);
  const [error, setError] = useState(null);

  const calculateTotal = () => {
    const shippingFee = 50; // Fixed shipping fee
    setTotalAmount(price + shippingFee);
  };

  const handleInputChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = async () => {
    try {
      if (!shippingDetails.address || !shippingDetails.city || !shippingDetails.zipCode) {
        alert("Please fill out all shipping details.");
        return;
      }

      const orderDetails = {
        customerName: "testuser",
        itemName,
        price,
        shippingDetails,
        totalAmount,
      };

      const response = await axios.post(
        "https://server-2-43kp.onrender.com/api/orders", 
        orderDetails, 
        { headers: { "Content-Type": "application/json" } }
      );

      alert(`Order placed successfully: ${response.data.message}`);
      window.location.href = "/orders"; // Redirect to the orders page after successful order
    } catch (err) {
      setError("Failed to place order. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="create-order">
        <h1>Create New Order</h1>
        <section className="order-form">
          <h2>Fill in the details</h2>
          <p>Item: {itemName}</p>
          <p>Price: M {price.toLocaleString()}</p>
          <p>Total Amount: M {totalAmount.toLocaleString()}</p>
          <div className="form-group">
            <label htmlFor="address">Shipping Address:</label>
            <input type="text" id="address" name="address" value={shippingDetails.address} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" value={shippingDetails.city} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">Zip Code:</label>
            <input type="text" id="zipCode" name="zipCode" value={shippingDetails.zipCode} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="deliveryDays">Estimated Delivery Days:</label>
            <input type="number" id="deliveryDays" name="deliveryDays" value={shippingDetails.deliveryDays} onChange={handleInputChange} min="1" required />
          </div>
          <button onClick={calculateTotal}>Calculate Total</button>
          <button onClick={handleOrder}>Place Order</button>
          {error && <p className="error-message">{error}</p>}
        </section>
      </div>
    </div>
  );
};

export default CreateOrder;
