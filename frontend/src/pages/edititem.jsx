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
        image_url: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:8081/product/${id}`);
                const data = await response.json();
                setItem(data);
                setPreviewImage(data.image_url); 
            } catch (error) {
                console.error("Error fetching item details:", error);
            }
        };
        fetchItem();
    }, [id]);

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setPreviewImage(URL.createObjectURL(file)); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let imageUrl = item.image_url;

        
        if (imageFile) {
            const formData = new FormData();
            formData.append("image", imageFile);

            try {
                const uploadResponse = await fetch("http://localhost:8081/upload-image", {
                    method: "POST",
                    body: formData,
                });
                const uploadData = await uploadResponse.json();
                imageUrl = uploadData.imageUrl; 
            } catch (error) {
                console.error("Error uploading image:", error);
                return;
            }
        }

        // Update item with new data
        try {
            await fetch(`http://localhost:8081/update-item/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...item, image_url: imageUrl }),
            });

            
            navigate("/my-items"); 
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    return (
        <div className="edit-item-container">
            <h2>Edit Item</h2>

            {/* Image Preview Section */}
            {previewImage && (
                <div className="image-preview">
                    <p>Image Preview:</p>
                    <img src={previewImage} alt="Item Preview" className="item-image" />
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={handleChange}
                    placeholder="Item Name"
                    required
                />
                <input
                    type="text"
                    name="location"
                    value={item.location}
                    onChange={handleChange}
                    placeholder="Location"
                    required
                />
                <textarea
                    name="description"
                    value={item.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={item.date}
                    onChange={handleChange}
                    required
                />

                {/* Image Upload Section */}
                <input type="file" accept="image/*" onChange={handleImageChange} />

                <button type="submit">Update Item</button>
            </form>
        </div>
    );
};

export default EditItem;
