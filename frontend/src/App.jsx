import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ListItem from "./pages/ListItem";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ItemDetails from "./pages/ItemDetails";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8081/products"); // Ensure the backend is running
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <main>
        <Routes>
          <Route path="/" element={<Home items={items} searchQuery={searchQuery} />} />
          <Route path="/list-item" element={<ListItem setItems={setItems} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/item/:id" element={<ItemDetails items={items} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
