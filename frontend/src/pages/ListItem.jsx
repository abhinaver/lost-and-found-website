import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./ListItem.css";

const ListItem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    type: "Found", // Default selection
    name: "",
    location: "",
    date: "",
    description: "",
    phone: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const username = localStorage.getItem("username");
    if (!username) {
      setError("Please log in to list an item");
      setLoading(false);
      return;
    }

    // Create FormData object to handle file upload
    const submitData = new FormData();
    submitData.append("username", username);
    submitData.append("type", formData.type);
    submitData.append("name", formData.name);
    submitData.append("location", formData.location);
    submitData.append("date", formData.date);
    submitData.append("description", formData.description);
    submitData.append("phone", formData.phone);
    
    if (formData.image) {
      submitData.append("image", formData.image);
    }

    try {
      const response = await axios.post('http://localhost:8081/add-product', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.message) {
        alert("Item listed successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error("Error submitting item:", err);
      setError(err.response?.data?.error || "Failed to submit item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="list-item-container">
      <div className="list-item-box">
        <h2>List an Item</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Item Type</label>
            <select name="type" className="styled-select" onChange={handleChange} required>
              <option value="Found">Found</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
          <div className="input-group">
            <label>Item Name</label>
            <input type="text" name="name" placeholder="Enter item name" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Location</label>
            <input type="text" name="location" placeholder="Enter location" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Date</label>
            <input type="date" name="date" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Description</label>
            <textarea name="description" placeholder="Describe the item" rows="3" onChange={handleChange} required></textarea>
          </div>
          <div className="input-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" placeholder="Enter your phone number" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Upload Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleFileChange} required />
            {formData.image && (
              <div className="image-preview">
                <img 
                  src={typeof formData.image === 'string' ? formData.image : URL.createObjectURL(formData.image)} 
                  alt="Preview" 
                  style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} 
                />
              </div>
            )}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListItem;