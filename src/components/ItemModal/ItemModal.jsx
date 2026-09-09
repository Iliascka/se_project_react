import "./ItemModal.css";
import closeBtn from "../../assets/closeBtnWhite.png";
import closeBtnDark from "../../assets/closeBtnDark.png";
import "../ModalWithForm/ModalWithForm.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useModalClose from "../../hooks/useModalClose";

function ItemModal({ isOpen, onClose, card, deleteModal }) {
  const { id } = useContext(CurrentUserContext);
  const isOwn = card.owner === id;
  const itemDeleteButtonClassName = `modal__delete-btn ${isOwn ? "" : "modal__delete-button_hidden"}`;
  useModalClose(isOpen, onClose);
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <div
        className="modal__content modal__content_type_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="close icon" className="modal__close-icon " />
          <img
            src={closeBtnDark}
            alt="close icon"
            className="modal__close-icon modal__close-icon_dark"
          />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__info">
            <h2 className="modal__caption"> {card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            onClick={deleteModal}
            type="button"
            className={itemDeleteButtonClassName}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
