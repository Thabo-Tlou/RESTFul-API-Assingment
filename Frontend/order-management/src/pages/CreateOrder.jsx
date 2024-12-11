import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/create.css";

const AddItem = () => {
    const [availableItems, setAvailableItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [orderData, setOrderData] = useState({
        customerName: "",
        quantity: 1,
        totalAmount: 0,
        shippingDetails: {
            address: "",
            deliveryDays: 0,
        },
        deliveryInstructions: "",
    });
    const [quantityError, setQuantityError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://server-2-43kp.onrender.com/api/items")
            .then((response) => setAvailableItems(response.data))
            .catch((error) => console.error("Error fetching items:", error));
    }, []);

    const handleItemSelect = (e) => {
        const itemId = e.target.value;
        const item = availableItems.find((item) => item._id === itemId);

        if (item) {
            setSelectedItem(item);
            setOrderData({
                ...orderData,
                productId: item._id,
                customerName: "",  // Reset customer name for new order
                totalAmount: item.price,
                shippingDetails: { ...orderData.shippingDetails },
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
                totalAmount: selectedItem.price * quantity,
            }));
        }
    };

    const handleShippingChange = (e) => {
        setOrderData((prevData) => ({
            ...prevData,
            shippingDetails: {
                ...prevData.shippingDetails,
                address: e.target.value,
            },
        }));
    };

    const handleDeliveryInstructionsChange = (e) => {
        setOrderData((prevData) => ({
            ...prevData,
            deliveryInstructions: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedItem) {
            alert("Please select an item to order.");
            return;
        }

        if (quantityError) {
            alert("Please enter a valid quantity.");
            return;
        }

        try {
            await axios.post("https://server-2-43kp.onrender.com/api/orders", orderData);
            alert("Order placed successfully!");
            navigate("/order-list");
        } catch (error) {
            console.error("Error placing order:", error.response?.data || error.message);
            alert("Failed to place order. Please check the details and try again.");
        }
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
                        <input type="text" value={selectedItem.name} readOnly />

                        <label>Price (per unit):</label>
                        <input type="number" value={selectedItem.price} readOnly />

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
                        <input type="number" value={orderData.totalAmount} readOnly />

                        <label>Shipping Address:</label>
                        <input
                            type="text"
                            value={orderData.shippingDetails.address}
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
