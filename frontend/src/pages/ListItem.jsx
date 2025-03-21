import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListItem.css";

const ListItem = ({ addItem }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    dateFound: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(formData); // Adds item to the global list
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="list-item-container">
      <div className="list-item-box">
        <h2>List a Found Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Item Name</label>
            <input type="text" name="name" placeholder="Enter item name" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Found Location</label>
            <input type="text" name="location" placeholder="Enter location" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Date Found</label>
            <input type="date" name="dateFound" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Description</label>
            <textarea name="description" placeholder="Describe the item" rows="3" onChange={handleChange} required></textarea>
          </div>
          <div className="input-group">
            <label>Image URL</label>
            <input type="text" name="image" placeholder="Paste image URL" onChange={handleChange} required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ListItem;
