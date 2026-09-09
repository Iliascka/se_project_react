import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "./AddItemModal.css";
import { useEffect, useMemo } from "react";

const AddItemModal = ({ isOpen, onAddItem, onClose, isLoading }) => {
  const defaultValues = useMemo(
    () => ({
      name: "",
      imageUrl: "",
      weather: "",
    }),
    [],
  );

  const {
    values,
    errors,
    hasSubmitted,
    setHasSubmitted,
    handleChange,
    resetForm,
    validateForm,
    isValid,
  } = useFormWithValidation(defaultValues);

  useEffect(() => {
    if (isOpen) {
      resetForm(defaultValues);
    }
  }, [defaultValues, isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setHasSubmitted(true);
    const { nextIsValid } = validateForm(values);

    if (!nextIsValid) {
      return;
    }

    onAddItem(values).then(() => {
      resetForm(defaultValues);
    });
  }

  const showNameError =
    Boolean(errors.name) && (hasSubmitted || values.name.trim().length > 0);
  const showImageUrlError =
    Boolean(errors.imageUrl) &&
    (hasSubmitted || values.imageUrl.trim().length > 0);
  const showWeatherError =
    Boolean(errors.weather) && (hasSubmitted || values.weather !== "");

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Saving..." : "Add garment"}
      isValid={isValid}
      isLoading={isLoading}
    >
      <label htmlFor="additem-name" className="modal__label">
        Name
        <input
          name="name"
          type="text"
          className={`modal__input ${showNameError ? "modal__input_type_error" : ""}`}
          id="additem-name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          aria-invalid={showNameError}
        />
        {showNameError ? (
          <span className="modal__error">{errors.name}</span>
        ) : null}
      </label>
      <label htmlFor="additem-imageUrl" className="modal__label">
        Image URL
        <input
          name="imageUrl"
          type="url"
          className={`modal__input ${showImageUrlError ? "modal__input_type_error" : ""}`}
          id="additem-imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          aria-invalid={showImageUrlError}
        />
        {showImageUrlError ? (
          <span className="modal__error">{errors.imageUrl}</span>
        ) : null}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the Weather type:</legend>

        <label
          htmlFor="additem-hot"
          className="modal__label modal__label_type_radio"
        >
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleChange}
            checked={values.weather === "hot"}
            id="additem-hot"
          />
          Hot
        </label>
        <label
          htmlFor="additem-warm"
          className="modal__label modal__label_type_radio"
        >
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleChange}
            checked={values.weather === "warm"}
            id="additem-warm"
          />
          Warm
        </label>
        <label
          htmlFor="additem-cold"
          className="modal__label modal__label_type_radio"
        >
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            onChange={handleChange}
            value="cold"
            checked={values.weather === "cold"}
            id="additem-cold"
          />
          Cold
        </label>
        {showWeatherError ? (
          <span className="modal__error">{errors.weather}</span>
        ) : null}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
