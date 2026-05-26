import "./ModalWithForm.css";
import closeBtn from "../../../assets/closeBtn.png";

function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  closeModal,
}) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={closeModal} type="button" className="modal__close">
          <img src={closeBtn} alt="" className="modal__close-icon" />
        </button>
        <form action="" className="modal__form">
          {children}
          <button className="modal__submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
