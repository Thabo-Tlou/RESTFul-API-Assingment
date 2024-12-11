import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/EditItem.css";

const EditItem = () => {
    const { id } = useParams(); // Get the id from the URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
    });

    useEffect(() => {
        // Fetch item data for editing
        axios.get(`https://server-2-43kp.onrender.com/api/items/${id}`)
            .then((response) => setFormData(response.data))
            .catch((error) => {
                console.error('Error fetching item:', error);
                alert('Failed to fetch item details. Please try again.');
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://server-2-43kp.onrender.com/api/items/${id}`, formData)
            .then(() => {
                alert('Item updated successfully');
                navigate('/item-list'); // Redirect to item list after successful update
            })
            .catch((error) => {
                console.error('Error updating item:', error);
                alert('Failed to update item. Please try again.');
            });
    };

    return (
        <div className="edit-item">
            <h2>Edit Item</h2>
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

                <button type="submit">Update Item</button>
            </form>
            <Link to="/item-list" className="back-button">Back to Item List</Link> {/* Link back to the item list */}
        </div>
    );
};

export default EditItem;
