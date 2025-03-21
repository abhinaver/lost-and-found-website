import React from "react";
import { Link } from "react-router-dom";
import "./ItemCard.css";

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <img src={item.image} alt={item.title} className="item-image" />
      <div className="item-info">
        <h3 className="item-title">{item.title}</h3>
        <p className="item-description">{item.description}</p>
        <Link to={`/item/${item.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
