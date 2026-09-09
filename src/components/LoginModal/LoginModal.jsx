import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useEffect, useMemo } from "react";
import useModalClose from "../../hooks/useModalClose";

const LoginModal = ({
  isOpen,
  handleLogin,
  onClose,
  handleSignUp,
  isLoading,
}) => {
  const defaultValues = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    [],
  );
  useModalClose(isOpen, onClose);

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

    handleLogin(values).then(() => {
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
      secondaryButtonText="or Sign Up"
      buttonModifier="small"
      isValid={isValid}
      onSecondaryButtonClick={handleSignUp}
      buttonText={isLoading ? "Logging in..." : "Log in"}
      isLoading={isLoading}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          name="email"
          type="email"
          className={`modal__input ${showEmailError ? "modal__input_type_error" : ""}`}
          id="login-email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          aria-invalid={showEmailError}
        />
        {showEmailError ? (
          <span className="modal__error">{errors.email}</span>
        ) : null}
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          name="password"
          type="password"
          className={`modal__input ${showPasswordError ? "modal__input_type_error" : ""}`}
          id="login-password"
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
