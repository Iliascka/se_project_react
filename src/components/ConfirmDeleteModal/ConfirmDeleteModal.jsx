import "./ConfirmDeleteModal.css";
import closeBtn from "../../assets/closeBtnGrey.png";

function ConfirmDeleteModal() {
  return (
    <div className="modal modal_opened">
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="confirm-modal__close">
          <img
            src={closeBtn}
            alt="closeButton"
            className="confirm-modal___close"
          />
        </button>
        <p className="confirm-modal__text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button type="button" className="confirm-modal__delete">
          Yes, delete item
        </button>
        <button type="button" className="confirm-modal__cancel">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
