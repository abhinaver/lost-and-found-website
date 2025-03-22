import { useState } from "react";
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
  const [items, setItems] = useState([
    {
      id: 1,
      type: "Found",
      name: "Black Wallet",
      description: "Leather wallet with some cash and ID cards.",
      location: "Central Park",
      date: "2025-03-10",
      phone: "123-456-7890",
      image: "/images/pexels-steve-1451567.jpg",
    },
    {
      id: 2,
      type: "Lost",
      name: "iPhone 12",
      description: "Lost in a taxi, has a black case.",
      location: "Downtown",
      date: "2025-03-15",
      phone: "987-654-3210",
      image: "/images/pexels-steve-1451567.jpg",
    },
    {
      id: 3,
      type: "Found",
      name: "Car Keys",
      description: "Found a set of car keys near the shopping mall entrance.",
      location: "Mall Parking Lot",
      date: "2025-03-12",
      phone: "555-123-4567",
      image: "/images/pexels-steve-1451567.jpg",
    },
    {
      id: 4,
      type: "Lost",
      name: "Blue Backpack",
      description: "Contains books and a laptop, lost on the bus.",
      location: "City Bus Route 22",
      date: "2025-03-08",
      phone: "111-222-3333",
      image: "/images/pexels-steve-1451567.jpg",
    },
    {
      id: 5,
      type: "Found",
      name: "Silver Bracelet",
      description: "Found a silver bracelet near the beach.",
      location: "Sunset Beach",
      date: "2025-03-14",
      phone: "444-555-6666",
      image: "/images/pexels-steve-1451567.jpg",
    },
    {
      id: 6,
      type: "Lost",
      name: "Samsung Galaxy S21",
      description: "Lost near a coffee shop, has a cracked screen.",
      location: "Starbucks, 5th Avenue",
      date: "2025-03-18",
      phone: "777-888-9999",
      image: "/images/pexels-steve-1451567.jpg",
    },
    {
      id: 7,
      type: "Found",
      name: "Brown Sunglasses",
      description: "Found stylish brown sunglasses near the metro station.",
      location: "Metro Station - Exit 3",
      date: "2025-03-16",
      phone: "222-333-4444",
      image: "/images/pexels-steve-1451567.jpg",
    },
    {
      id: 8,
      type: "Lost",
      name: "Red Purse",
      description: "Small red purse containing keys and credit cards, lost at a restaurant.",
      location: "Italian Bistro, Main Street",
      date: "2025-03-20",
      phone: "666-777-8888",
      image: "/images/pexels-steve-1451567.jpg",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

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
