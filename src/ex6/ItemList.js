import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemForm from './ItemForm';
import './ItemList.css';

const ItemList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const handleAddItem = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  };

  const handleDeleteItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="item-list-container">
      <h1>Item Management</h1>
      
      <div className="content-wrapper">
        <div className="form-section">
          <h2>Add New Item</h2>
          <ItemForm onAddItem={handleAddItem} />
        </div>

        <div className="list-section">
          <h2>Items List</h2>
          {items.length === 0 ? (
            <p className="no-items">No items added yet. Start by adding some items!</p>
          ) : (
            <ul className="items-grid">
              {items.map(item => (
                <li key={item.id} className="item-card">
                  <div className="item-header">
                    <h3>{item.name}</h3>
                    <span className="quantity">Qty: {item.quantity}</span>
                  </div>
                  <p className="description">{item.description}</p>
                  <button 
                    onClick={() => handleDeleteItem(item.id)}
                    className="delete-btn"
                    aria-label={`Delete ${item.name}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="footer-actions">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default ItemList;
