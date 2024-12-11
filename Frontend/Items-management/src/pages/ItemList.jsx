import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/ItemList.css"; 

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        
        axios.get('https://server-2-43kp.onrender.com/api/items')
            .then((response) => setItems(response.data))
            .catch((error) => console.error('Error fetching items:', error));
    }, []);

    const deleteItem = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            axios.delete(`https://server-2-43kp.onrender.com/api/items/${id}`)
                .then(() => {
                    alert('Item deleted successfully');
                    setItems(items.filter((item) => item._id !== id));
                })
                .catch((error) => console.error('Error deleting item:', error));
        }
    };

    return (
        <div className="item-list">
            <h2>Manage Items</h2>
            <Link to="/add-item" className="add-button">Add New Item</Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <Link to={`/edit-item/${item._id}`} className="edit-button">Edit</Link>
                                <button onClick={() => deleteItem(item._id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemList;
