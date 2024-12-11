import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddEditItem.css'; 
import "../styles/App.css";

const AddItem = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://server-2-43kp.onrender.com/api/items', formData) 
            .then(() => {
                alert('Item added successfully');
                setFormData({
                    name: '',
                    price: '',
                    quantity: '',
                    description: '',
                });
                navigate('/'); 
            })
            .catch((error) => {
                console.error('Error adding item:', error);
                alert('Failed to add item. Please try again.');
            });
    };

    return (
        <div className="add-item">
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />

                <label>Price:</label>
                <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    required 
                />

                <label>Quantity:</label>
                <input 
                    type="number" 
                    name="quantity" 
                    value={formData.quantity} 
                    onChange={handleChange} 
                    required 
                />

                <label>Description:</label>
                <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                ></textarea>

                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default AddItem;
