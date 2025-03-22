import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ListItem from "./pages/ListItem";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ItemDetails from "./pages/ItemDetails";
import MyListings from "./pages/myitems"; 
import EditItem from "./pages/edititem";
import "./App.css";

function App() {
  const [items, setItems] = useState([]); // ✅ Store items from DB
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null); // ✅ Store logged-in user

  // Fetch items from DB
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8081/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Fetched Items:", data);
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []); // Runs once on component mount

  // Retrieve user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <>
      <Header setSearchQuery={setSearchQuery} user={user} setUser={setUser} />
      <main>
        <Routes>
          <Route path="/" element={<Home items={items} searchQuery={searchQuery} />} />
          <Route path="/list-item" element={<ListItem setItems={setItems} user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/item/:id" element={<ItemDetails items={items} />} />
          <Route path="/my-items" element={<MyListings items={items} user={user} setItems={setItems} />} />
          <Route path="/edit-item/:id" element={<EditItem />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
