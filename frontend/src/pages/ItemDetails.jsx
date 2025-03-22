import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ItemDetails.css";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8081/product/${id}`);
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (!item) {
    return <div className="error-message">Item not found!</div>;
  }

  return (
    <div className="item-details-container">
      <div className="item-details">
        <img
          src={item.image_url}
          alt={item.name}
          className="item-details-image"
        
        />
        <div className="item-details-info">
          <h2 className="item-details-title">{item.name}</h2>
          <p className="item-details-description">{item.description}</p>
          <p className="item-details-location">
            <strong>Location:</strong> {item.location}
          </p>
          <p className="item-details-date">
            <strong>Found Date:</strong> {new Date(item.date).toDateString()}
          </p>
          <p className="item-details-phone">
            <strong>Contact:</strong> {item.phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
