import { useState } from "react";
import "./ListItem.css";

const ListItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="list-item-container">
      <h2>List a Found Item</h2>
      <input type="text" name="name" placeholder="Item Name" onChange={handleChange} />
      <input type="text" name="location" placeholder="Found Location" onChange={handleChange} />
      <input type="text" name="image" placeholder="Image URL" onChange={handleChange} />
      <button>Submit</button>
    </div>
  );
};

export default ListItem;
