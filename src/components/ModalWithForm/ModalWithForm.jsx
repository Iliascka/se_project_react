import "./ModalWithForm.css";
import closeBtn from "../../assets/closeBtn.png";
import closeBtnDark from "../../assets/closeBtnDark.png";

function ModalWithForm({
  children,
  title,
  buttonText,
  name,
  isOpen,
  onClose,
  onSubmit,
  secondaryButtonText,
  buttonModifier,
}) {
  return (
    <div className={`modal  ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <div
        className={`modal__content modal__type_${name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="close icon" className="modal__close-icon " />
          <img
            src={closeBtnDark}
            alt="close icon"
            className="modal__close-icon modal__close-icon_dark "
          />
        </button>
        <form noValidate onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__submit-container">
            <button
              type="submit"
              className={`modal__submit ${buttonModifier === "small" ? "modal__submit_type_small" : ""}`}
            >
              {buttonText}
            </button>
            {secondaryButtonText ? (
              <button type="button" className="modal__submit-secondary">
                {secondaryButtonText}
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
