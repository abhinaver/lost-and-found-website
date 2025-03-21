import ItemCard from "../components/ItemCard";
import "./Home.css";

const Home = () => {
  const items = [
    { id: 1, name: "Wallet", location: "Park", image: "wallet.jpg" },
    { id: 2, name: "Phone", location: "Mall", image: "phone.jpg" },
  ];

  return (
    <div className="home-container">
      <h2>Found Items</h2>
      <div className="items-list">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
