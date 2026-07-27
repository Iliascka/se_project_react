import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useForm";
import "./AddItemModal.css";
import { useEffect, useMemo } from "react";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = useMemo(
    () => ({
      name: "",
      imageUrl: "",
      weather: "",
    }),
    [],
  );

  const { values, errors, isValid, handleChange, resetForm, validateForm } =
    useFormWithValidation(defaultValues);

  useEffect(() => {
    if (isOpen) {
      resetForm(defaultValues);
    }
  }, [defaultValues, isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    const { nextIsValid } = validateForm(values);

    if (!nextIsValid) {
      return;
    }

    onAddItem(values).then(() => {
      resetForm(defaultValues);
    });
  }

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Add garment"
      isSubmitDisabled={!isValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          name="name"
          type="text"
          className={`modal__input ${errors.name ? "modal__input_type_error" : ""}`}
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
        {errors.name ? (
          <span className="modal__error">{errors.name}</span>
        ) : null}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image URL
        <input
          name="imageUrl"
          type="url"
          className={`modal__input ${errors.imageUrl ? "modal__input_type_error" : ""}`}
          id="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
        {errors.imageUrl ? (
          <span className="modal__error">{errors.imageUrl}</span>
        ) : null}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the Weather type:</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleChange}
            checked={values.weather === "hot"}
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
            onChange={handleChange}
            checked={values.weather === "warm"}
            id="warm"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            onChange={handleChange}
            value="cold"
            checked={values.weather === "cold"}
            id="cold"
          />
          Cold
        </label>
        {errors.weather ? (
          <span className="modal__error">{errors.weather}</span>
        ) : null}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
