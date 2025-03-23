import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./myitems.css";

const MyListings = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    // Get username from localStorage instead of user_id
    const username = localStorage.getItem("username"); 

    useEffect(() => {
        const fetchUserItems = async () => {
            try {
                setLoading(true);
                // Use username parameter instead of user_id
                const response = await fetch(`/my-item/${username}`);
                const data = await response.json();
                console.log("Data received from API:", data); // Debug log
                setItems(data);
            } catch (error) {
                console.error("Error fetching user items:", error);
                setItems([]);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUserItems();
        } else {
            console.error("No username found in localStorage");
            setLoading(false);
        }
    }, [username]);

    const handleDelete = async (id) => {
        try {
            await fetch(`/delete-item/${id}`, { method: "DELETE" });
            setItems(items.filter(item => item.id !== id)); // Remove item from UI
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    if (loading) return <div className="loading">Loading your items...</div>;

    return (
        <div className="my-listings-container">
            <h2>My Listings</h2>
            {items && items.length > 0 ? (
                <div className="items-grid">
                    {items.map((item) => (
                        <div key={item.id} className="item-card">
                            {item.image_url && (
                                <img 
                                    src={item.image_url} 
                                    alt={item.name || "Item"} 
                                    className="item-image" 
                                    onError={(e) => {
                                        e.target.src = "/placeholder-image.jpg"; 
                                        console.log("Image failed to load:", item.image_url);
                                    }}
                                />
                            )}
                            <div className="item-info">
                                <h3>{item.name || "Unnamed Item"}</h3>
                                <p><strong>Location:</strong> {item.location || "N/A"}</p>
                                <p><strong>Date:</strong> {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</p>
                                <p><strong>Description:</strong> {item.description || "No description"}</p>
                                <div className="buttons">
                                    <Link to={`/edit-item/${item.id}`} className="edit-btn">Edit</Link>
                                    <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No items listed. {!username && "Please log in to view your items."}</p>
            )}
        </div>
    );
};

export default MyListings;