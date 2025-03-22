import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyItems.css"; // Make sure you have styles for this page

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Store userId in localStorage after login
        if (!userId) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:8081/my-items/${userId}`);
        setItems(response.data);
      } catch (err) {
        setError("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };

    fetchMyItems();
  }, []);

  return (
    <div className="my-items-container">
      <h2>My Listed Items</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : items.length === 0 ? (
        <p>No items listed yet.</p>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <img src={item.image_url} alt={item.name} className="item-image" />
              <h3>{item.name}</h3>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Date:</strong> {item.date}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Phone:</strong> {item.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyItems;
