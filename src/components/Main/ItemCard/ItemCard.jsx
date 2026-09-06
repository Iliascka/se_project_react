import "./ItemCard.css";
import likeBtnOutline from "../../../assets/LikeBtnOutline.png";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className="card">
      <h2 className="card__name"> {item.name}</h2>
      <button className="card__like-btn">
        <img src={likeBtnOutline} alt="" className="card__like-icon" />
      </button>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
