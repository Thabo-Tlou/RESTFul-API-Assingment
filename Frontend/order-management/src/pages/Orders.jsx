import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Orders.css";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://server-2-43kp.onrender.com/api/orders");
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
 
      <div className="orders">
        <h1>All Orders</h1>
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul>
            {orders.map(order => (
              <li key={order._id}>
                <p>Order ID: {order._id}</p>
                <p>Item: {order.itemName}</p>
                <p>Price: M {order.price.toLocaleString()}</p>
                <p>Total: M {order.totalAmount.toLocaleString()}</p>
                <p>Shipping Address: {order.shippingDetails.address}, {order.shippingDetails.city}, {order.shippingDetails.zipCode}</p>
                <p>Delivery Days: {order.shippingDetails.deliveryDays}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

  );
};

export default Orders;
