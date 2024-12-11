import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/create.css";

const AddItem = () => {
    const [availableItems, setAvailableItems] = useState([]); 
    const [selectedItem, setSelectedItem] = useState(null); 
    const [orderData, setOrderData] = useState({
        name: "",
        price: 0,
        quantity: 1,
        total: 0,
        shippingAddress: "",
        deliveryInstructions: "",
    });
    const [quantityError, setQuantityError] = useState(false); 
    const navigate = useNavigate();

   
    useEffect(() => {
        axios
            .get("https://server-2-43kp.onrender.com/api/items")
            .then((response) => {
                setAvailableItems(response.data);
            })
            .catch((error) => console.error("Error fetching items:", error));
    }, []);


    const handleItemSelect = (e) => {
        const itemId = e.target.value;
        const item = availableItems.find((item) => item._id === itemId);

        if (item) {
            setSelectedItem(item);
            setOrderData({
                name: item.name,
                price: item.price,
                quantity: 1,
                total: item.price,
                shippingAddress: "",
                deliveryInstructions: "",
            });
        }
    };

 
    const handleQuantityChange = (e) => {
        const quantity = parseInt(e.target.value, 10);
        if (isNaN(quantity) || quantity < 1) {
            setQuantityError(true);
        } else {
            setQuantityError(false);
            setOrderData((prevData) => ({
                ...prevData,
                quantity,
                total: prevData.price * quantity,
            }));
        }
    };


    const handleShippingChange = (e) => {
        setOrderData((prevData) => ({
            ...prevData,
            shippingAddress: e.target.value,
        }));
    };

  
    const handleDeliveryInstructionsChange = (e) => {
        setOrderData((prevData) => ({
            ...prevData,
            deliveryInstructions: e.target.value,
        }));
    };

    // Submit order
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedItem) {
            alert("Please select an item to order.");
            return;
        }

        if (quantityError) {
            alert("Please enter a valid quantity.");
            return;
        }

        axios
            .post("https://server-2-43kp.onrender.com/api/orders", orderData)
            .then(() => {
                alert("Order placed successfully!");
                navigate("/order-list");
            })
            .catch((error) => console.error("Error placing order:", error));
    };

    return (
        <div className="add-item">
            <h2>Order Item</h2>
            <form onSubmit={handleSubmit}>
                <label>Available Items:</label>
                <select onChange={handleItemSelect} required>
                    <option value="">-- Select an item --</option>
                    {availableItems.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                {selectedItem && (
                    <>
                        <label>Item Name:</label>
                        <input type="text" value={orderData.name} readOnly />

                        <label>Price (per unit):</label>
                        <input type="number" value={orderData.price} readOnly />

                        <label>Quantity:</label>
                        <input
                            type="number"
                            min="1"
                            value={orderData.quantity}
                            onChange={handleQuantityChange}
                            required
                        />
                        {quantityError && <span className="error">Invalid quantity</span>}

                        <label>Total Price:</label>
                        <input type="number" value={orderData.total} readOnly />

                        <label>Shipping Address:</label>
                        <input
                            type="text"
                            value={orderData.shippingAddress}
                            onChange={handleShippingChange}
                            required
                        />

                        <label>Delivery Instructions:</label>
                        <input
                            type="text"
                            value={orderData.deliveryInstructions}
                            onChange={handleDeliveryInstructionsChange}
                        />
                    </>
                )}

                <button type="submit" disabled={!selectedItem || quantityError}>
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default AddItem;
