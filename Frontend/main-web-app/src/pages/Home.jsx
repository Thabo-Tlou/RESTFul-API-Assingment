import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Home-page.css";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Corrected the API URL to include HTTPS
        const response = await axios.get("https://server-2-43kp.onrender.com/api/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleOrder = (item) => {
    // Construct the URL to redirect to the hosted order management system
    const orderUrl = `https://restfulapi-order-management-system.netlify.app/create-order?itemName=${encodeURIComponent(item.name)}&price=${item.price}`;

    // Redirect to the order management site
    window.location.href = orderUrl;
  };

  return (
    <div>
      <Header />
      <section className="home-banner">
        <img src="/images/img.jpg" alt="Logo" className="Logo" />
        <h1>Get Your Best Tech Accessories With Us!</h1>
      </section>
      <section className="home-products">
        <h2>Available Items</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : items.length === 0 ? (
          <p>No products available at the moment.</p>
        ) : (
          <div className="home-products__list">
            {items.map((item) => (
              <div key={item._id} className="home-products__card">
                <h3>{item.name}</h3>
                <img
                  src={`/images/${item.name}.jpg`}
                  alt={item.name}
                  className="home-products__image"
                />
                <p>Price: M {item.price.toLocaleString()}</p>
                <p>Quantity Available: {item.quantity}</p>
                <button
                  className="home-products__button"
                  onClick={() => handleOrder(item)}
                >
                  Order
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Home;
