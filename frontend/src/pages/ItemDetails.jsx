import React from "react";
import { useParams } from "react-router-dom";
import "./ItemDetails.css";

const ItemDetails = ({ items }) => {
  const { id } = useParams();
  const item = items.find((item) => item.id.toString() === id);

  if (!item) {
    return <div className="error-message">Item not found!</div>;
  }

  return (
    <div className="item-details-container">
      <div className="item-details">
        <img src={item.image} alt={item.title} className="item-details-image" />
        <div className="item-details-info">
          <h2 className="item-details-title">{item.title}</h2>
          <p className="item-details-description">{item.description}</p>
          <p className="item-details-location"><strong>Location:</strong> {item.location}</p>
          <p className="item-details-date"><strong>Found Date:</strong> {item.date}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
