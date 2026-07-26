import "./ConfirmDeleteModal.css";
import closeBtn from "../../assets/closeBtnGrey.png";

function ConfirmDeleteModal({ isOpen, onDelete, card, onClose }) {
  const handleDeleteClick = () => {
    onDelete(card._id);
  };
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="confirm-modal__close">
          <img
            onClick={onClose}
            src={closeBtn}
            alt="closeButton"
            className="confirm-modal__close"
          />
        </button>
        <p className="confirm-modal__text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          onClick={handleDeleteClick}
          type="button"
          className="confirm-modal__delete"
        >
          Yes, delete item
        </button>
        <button
          onClick={onClose}
          type="button"
          className="confirm-modal__cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
