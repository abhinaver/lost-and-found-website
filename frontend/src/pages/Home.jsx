import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import "./Home.css";

const Home = ({ searchQuery }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8081/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Fetched Data:", data); // ✅ Debugging
        setItems(data); // ✅ Directly set the array
      } catch (error) {
        console.error("Error fetching items:", error);
        setItems([]);
      }
    };

    fetchItems();
  }, []);

  // Ensure `searchQuery` is always a string
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

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
