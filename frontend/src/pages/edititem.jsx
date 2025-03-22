import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./edititem.css";

const EditItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState({
        name: "",
        location: "",
        description: "",
        date: "",
        image_url: ""
    });

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:8081/products/${id}`);
                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error("Error fetching item details:", error);
            }
        };
        fetchItem();
    }, [id]);

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:8081/update-item/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
            });
            navigate("/my-listings"); // Redirect after edit
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    return (
        <div className="edit-item-container">
            <h2>Edit Item</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={item.name} onChange={handleChange} placeholder="Item Name" required />
                <input type="text" name="location" value={item.location} onChange={handleChange} placeholder="Location" required />
                <textarea name="description" value={item.description} onChange={handleChange} placeholder="Description" required />
                <input type="date" name="date" value={item.date} onChange={handleChange} required />
                <input type="text" name="image_url" value={item.image_url} onChange={handleChange} placeholder="Image URL" required />
                <button type="submit">Update Item</button>
            </form>
        </div>
    );
};

export default EditItem;
