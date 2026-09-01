import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

import { useEffect, useMemo } from "react";

const LoginModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = useMemo(
    () => ({
      email: "",
      password: "",
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

  const showEmailError =
    Boolean(errors.email) && (hasSubmitted || values.email.trim().length > 0);
  const showPasswordError =
    Boolean(errors.password) &&
    (hasSubmitted || values.password.trim().length > 0);

  return (
    <ModalWithForm
      name="add-garment"
      title="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Log in"
      secondaryButtonText=" or Register"
      buttonModifier="small"
    >
      <label htmlFor="email" className="modal__label">
        Email
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
        Password
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
    </ModalWithForm>
  );
};

export default LoginModal;
