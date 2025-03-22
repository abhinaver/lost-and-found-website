import React from "react";
import { Link } from "react-router-dom";
import "./ItemCard.css";

const ItemCard = ({ item }) => {
  console.log("Item Data:", item); // ✅ Debugging: Check if item data is correct

  return (
    <div className="item-card">
      <img src={item.image_url} alt={item.name} className="item-image" onError={(e) => e.target.src = "/fallback-image.png"} />
      <div className="item-info">
        <h3 className="item-title">{item.name}</h3>
        <p className="item-date"><strong>Found Date:</strong> {new Date(item.date).toDateString()}</p>
        <p className="item-location"><strong>Location:</strong> {item.location}</p>
        <Link to={`/item/${item.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
