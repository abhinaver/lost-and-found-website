import "./ItemCard.css";

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <img src={item.image} alt={item.name} className="item-image" />
      <h3>{item.name}</h3>
      <p>Found at: {item.location}</p>
    </div>
  );
};

export default ItemCard;
