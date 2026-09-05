import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useEffect, useMemo } from "react";

const ProfileModal = ({ isOpen, handleProfile, onClose }) => {
  const defaultValues = useMemo(
    () => ({
      email: "",
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

    handleLogin(values);
    resetForm(defaultValues);
  }

  const showNameError =
    Boolean(errors.name) && (hasSubmitted || values.email.trim().length > 0);
  const showAvatarError =
    Boolean(errors.password) &&
    (hasSubmitted || values.password.trim().length > 0);

  return (
    <ModalWithForm
      name="add-garment"
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Save changes"
    >
      <label htmlFor="email" className="modal__label">
        Name *
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
        Avatar *
        <input
          name="avatar"
          type="url"
          className={`modal__input ${showAvatarError ? "modal__input_type_error" : ""}`}
          id="avatar"
          placeholder="Avatar URL  "
          value={values.avatar}
          onChange={handleChange}
          aria-invalid={showAvatarError}
        />
        {showAvatarError ? (
          <span className="modal__error">{errors.avatar}</span>
        ) : null}
      </label>
    </ModalWithForm>
  );
};

export default ProfileModal;
