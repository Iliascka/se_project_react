import "./ItemCard.css";
import likeBtnOutline from "../../../assets/LikeBtnOutline.png";
import likeBtnFill from "../../../assets/LikeBtnFill.png";
import { useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
function ItemCard({ item, onCardClick, onCardLike }) {
  const { id } = useContext(CurrentUserContext);
  const isLiked = item.likes.some((userId) => userId === id);
  const itemLikeButtonClassName = isLiked ? likeBtnFill : likeBtnOutline;

  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleLike = () => {
    onCardLike({ _id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name"> {item.name}</h2>
        <button onClick={handleLike} className="card__like-btn">
          <img
            src={itemLikeButtonClassName}
            alt=""
            className="card__like-icon"
          />
        </button>
      </div>

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
