import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

import { useEffect, useMemo } from "react";

const RegisterModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = useMemo(
    () => ({
      email: "",
      password: "",
      name: "",
      avatar: "",
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
  const showEmailError =
    Boolean(errors.email) && (hasSubmitted || values.email.trim().length > 0);
  const showPasswordError =
    Boolean(errors.password) &&
    (hasSubmitted || values.password.trim().length > 0);
  const showavatarError =
    Boolean(errors.avatar) && (hasSubmitted || values.avatar.trim().length > 0);

  return (
    <ModalWithForm
      name="add-garment"
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Next"
      secondaryButtonText=" or Log in"
      buttonModifier="small"
    >
      <label htmlFor="email" className="modal__label">
        Email*
        <input
          name="email"
          type="email"
          className={`modal__input ${showEmailError ? "modal__input_type_error" : ""}`}
          id="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          aria-invalid={showEmailError}
        />
        {showEmailError ? (
          <span className="modal__error">{errors.email}</span>
        ) : null}
      </label>
      <label htmlFor="password" className="modal__label">
        Password*
        <input
          name="password"
          type="password"
          className={`modal__input ${showPasswordError ? "modal__input_type_error" : ""}`}
          id="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          aria-invalid={showPasswordError}
        />
        {showPasswordError ? (
          <span className="modal__error">{errors.password}</span>
        ) : null}
      </label>
      <label htmlFor="name" className="modal__label">
        Name
        <input
          name="name"
          type="text"
          className={`modal__input ${showNameError ? "modal__input_type_error" : ""}`}
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          aria-invalid={showNameError}
        />
        {showNameError ? (
          <span className="modal__error">{errors.name}</span>
        ) : null}
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar
        <input
          name="avatar"
          type="url"
          className={`modal__input ${showavatarError ? "modal__input_type_error" : ""}`}
          id="avatar"
          placeholder="Avatar URL  "
          value={values.avatar}
          onChange={handleChange}
          aria-invalid={showavatarError}
        />
        {showavatarError ? (
          <span className="modal__error">{errors.avatar}</span>
        ) : null}
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
