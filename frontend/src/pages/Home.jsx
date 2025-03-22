import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import "./Home.css";

const Home = ({ items, searchQuery }) => {
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    // Normalize search query
    const lowerCaseQuery = searchQuery.toLowerCase().trim();

    const filteredResults = items.filter((item) => {
      return (
        item.name.toLowerCase().includes(lowerCaseQuery) ||
        item.location.toLowerCase().includes(lowerCaseQuery) ||
        item.date.includes(lowerCaseQuery) // Ensures date filtering works
      );
    });

    setFilteredItems(filteredResults);
  }, [searchQuery, items]); // ✅ Re-runs when searchQuery or items change

  const foundItems = filteredItems.filter((item) => item.type === "Found");
  const lostItems = filteredItems.filter((item) => item.type === "Lost");

  return (
    <div className="home-container">
      <h2>Available Items</h2>
      <div className="items-section">
        <div className="found-items">
          <h3>Found Items</h3>
          <div className="items-grid">
            {foundItems.length > 0 ? (
              foundItems.map((item) => <ItemCard key={item.id} item={item} />)
            ) : (
              <p>No found items.</p>
            )}
          </div>
        </div>
        <div className="lost-items">
          <h3>Lost Items</h3>
          <div className="items-grid">
            {lostItems.length > 0 ? (
              lostItems.map((item) => <ItemCard key={item.id} item={item} />)
            ) : (
              <p>No lost items.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
