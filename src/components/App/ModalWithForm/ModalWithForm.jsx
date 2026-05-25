import "./ModalWithForm.css";
import closeBtn from "../../../assets/closeBtn.png";

function ModalWithForm() {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">New Garment</h2>
        <button className="modal__close">
          <img src={closeBtn} alt="" className="modal__close-icon" />
        </button>
        <form action="" className="modal__form">
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="text"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the Weather type:</legend>

            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              {" "}
              <input
                name="weather"
                type="radio"
                className="modal__radio-input"
                id="hot"
              />
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                name="weather"
                type="radio"
                className="modal__radio-input"
                id="warm"
              />
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                name="weather"
                type="radio"
                className="modal__radio-input"
                id="cold"
              />
              Cold
            </label>
          </fieldset>
          <button className="modal__submit">Add garment</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
