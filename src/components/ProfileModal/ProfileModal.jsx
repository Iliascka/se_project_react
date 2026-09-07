import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useEffect, useMemo } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ProfileModal = ({ isOpen, handleUserUpdate, onClose }) => {
  const { name, avatar } = useContext(CurrentUserContext);
  const defaultValues = useMemo(
    () => ({
      name: name,
      avatar: avatar,
    }),
    [name, avatar],
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

    handleUserUpdate(values).then(() => {
      onClose();
      resetForm(defaultValues);
    });
  }

  const showNameError =
    Boolean(errors.name) && (hasSubmitted || values.name.trim().length > 0);
  const showAvatarError =
    Boolean(errors.avatar) && (hasSubmitted || values.avatar.trim().length > 0);

  return (
    <ModalWithForm
      name="add-garment"
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Save changes"
      isValid={isValid}
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
