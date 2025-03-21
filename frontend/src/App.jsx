import { useState } from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ListItem from "./pages/ListItem";
import Login from "./pages/Login";
import "./App.css";
import Signup from "./pages/Signup";
import ItemDetails from "./pages/ItemDetails";



const items = [
  { id: 1, title: "Black Wallet", description: "Lost near the park", location: "Central Park", date: "March 10, 2025", image: "/images/wallet.jpg" },
  { id: 2, title: "iPhone 12", description: "Found in a taxi", location: "Downtown", date: "March 15, 2025", image: "/images/iphone.jpg" }
];

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list-item" element={<ListItem />} />
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
