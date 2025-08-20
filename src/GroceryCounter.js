import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GroceryCounter.css";

export default function GroceryCounter() {
  const navigate = useNavigate();

  const products = [
    { name: "Apples", price: 50 },
    { name: "Bananas", price: 30 },
    { name: "Bread", price: 40 },
    { name: "Milk", price: 25 }
  ];

  const [counts, setCounts] = useState(Array(products.length).fill(0));

  const increment = (index) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
  };

  const decrement = (index) => {
    const newCounts = [...counts];
    if (newCounts[index] > 0) {
      newCounts[index] -= 1;
      setCounts(newCounts);
    }
  };

  const totalQuantity = counts.reduce((sum, q) => sum + q, 0);
  const totalPrice = counts.reduce((sum, q, i) => sum + q * products[i].price, 0);

  return (
    <div className="app">
      <h1>🛒 Grocery Counter</h1>

      <div className="product-list">
        {products.map((p, i) => (
          <div className="counter-card" key={p.name}>
            <h2>{p.name}</h2>
            <p className="price">₹{p.price}</p>

            <div className="counter-controls">
              <button onClick={() => decrement(i)}>-</button>
              <span>{counts[i]}</span>
              <button onClick={() => increment(i)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="summary">
        <h2>Bill Details:</h2>
        {products.map((p, i) =>
          counts[i] > 0 ? (
            <p key={p.name}>
              {p.name} {counts[i]} kg = ₹{p.price * counts[i]}
            </p>
          ) : null
        )}
        <hr />
        <h3>Total Quantity: {totalQuantity} kg</h3>
        <h3>Total Price: ₹{totalPrice}</h3>
      </div>

      <div className="home-btn-wrapper">
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "24px",
            padding: "10px 22px",
            backgroundColor: "#2e8b57",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          ← Go to Home Page
        </button>
      </div>
    </div>
  );
}
