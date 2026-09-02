import { useCallback, useState } from "react";

const validateValue = (name, value = "") => {
  const normalizedValue = typeof value === "string" ? value : "";

  switch (name) {
    case "email":
      if (!normalizedValue.trim()) return "Please enter a valid email.";
      if (!/^\S+@\S+\.\S+$/.test(normalizedValue.trim())) {
        return "Please enter a valid email.";
      }
      return "";
    case "password":
      if (!normalizedValue.trim()) return "Please enter a valid password";
      if (normalizedValue.trim().length < 8) {
        return "Password must be at least 8 characters long";
      }
      return "";
    case "name":
      if (!normalizedValue.trim()) return "Please enter a name.";
      if (normalizedValue.trim().length < 2) {
        return "Name must be at least 2 characters long.";
      }
      return "";
    case "imageUrl":
      if (!normalizedValue.trim()) return "Please enter an image URL.";
      if (!/^(https?:\/\/)\S+\.\S+/.test(normalizedValue.trim())) {
        return "Please enter a valid URL.";
      }
      return "";
    case "weather":
      if (!normalizedValue) return "Please select a weather type.";
      return "";
    case "avatar":
      if (!normalizedValue.trim()) return "Please enter an avatar URL.";
      if (!/^(https?:\/\/)\S+\.\S+/.test(normalizedValue.trim())) {
        return "Please enter a valid URL.";
      }
      return "";
    default:
      return "";
  }
};

export function useFormWithValidation(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validateForm = useCallback((formValues) => {
    const nextErrors = Object.keys(formValues).reduce((acc, fieldName) => {
      const errorMessage = validateValue(fieldName, formValues[fieldName]);
      if (errorMessage) {
        acc[fieldName] = errorMessage;
      }
      return acc;
    }, {});

    setErrors(nextErrors);
    const nextIsValid = Object.values(nextErrors).every((error) => !error);
    setIsValid(nextIsValid);

    return { nextErrors, nextIsValid };
  }, []);

  const handleChange = useCallback(
    (evt) => {
      const { name, value } = evt.target;

      setValues((previousValues) => {
        const nextValues = { ...previousValues, [name]: value };
        const { nextErrors, nextIsValid } = validateForm(nextValues);
        setErrors(nextErrors);
        setIsValid(nextIsValid);
        return nextValues;
      });
    },
    [validateForm],
  );

  const resetForm = useCallback(
    (newValues = defaultValues) => {
      setValues(newValues);
      setErrors({});
      setIsValid(false);
      setHasSubmitted(false);
    },
    [defaultValues],
  );

  return {
    values,
    setValues,
    errors,
    isValid,
    hasSubmitted,
    setHasSubmitted,
    handleChange,
    resetForm,
    validateForm,
  };
}
