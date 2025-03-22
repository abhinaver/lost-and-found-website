import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListItem.css";

const ListItem = ({ setItems }) => {
  const navigate = useNavigate();
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
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems((prevItems) => [...prevItems, { id: prevItems.length + 1, ...formData }]);
    navigate("/");
  };

  return (
    <div className="list-item-container">
      <div className="list-item-box">
        <h2>List an Item</h2>
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
            <input type="file" accept="image/*" onChange={handleFileChange} required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ListItem;
