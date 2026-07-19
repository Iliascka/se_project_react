import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, handleSubmit, onClose }) => {
  // ...

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Add garment"
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image URL{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the Weather type:</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          {" "}
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="hot"
            id="hot"
            required
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="warm"
            id="warm"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="cold"
            id="cold"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
