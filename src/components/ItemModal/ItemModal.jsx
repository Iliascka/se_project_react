import "./ItemModal.css";
import closeBtn from "../../assets/closeBtnWhite.png";
import closeBtnDark from "../../assets/closeBtnDark.png";
import "../ModalWithForm/ModalWithForm.css";

function ItemModal({ isOpen, onClose, card }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`} onClick={onClose}>
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
          <h2 className="modal__caption"> {card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
