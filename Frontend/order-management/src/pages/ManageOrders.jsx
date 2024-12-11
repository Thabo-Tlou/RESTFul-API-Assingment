import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import "../styles/gen.css";
import "../styles/animations.css";

const ManageOrders = () => {
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

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`https://server-2-43kp.onrender.com/api/orders/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="manage-orders">
        <h1>Manage Orders</h1>
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
                <button onClick={() => handleDelete(order._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
