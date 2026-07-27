import { useCallback, useState } from "react";

const validateValue = (name, value) => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Please enter a garment name.";
      if (value.trim().length < 2) {
        return "Name must be at least 2 characters long.";
      }
      return "";
    case "imageUrl":
      if (!value.trim()) return "Please enter an image URL.";
      if (!/^(https?:\/\/)\S+\.\S+/.test(value.trim())) {
        return "Please enter a valid URL.";
      }
      return "";
    case "weather":
      if (!value) return "Please select a weather type.";
      return "";
    default:
      return "";
  }
};

export function useFormWithValidation(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

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
      const nextValues = { ...values, [name]: value };
      setValues(nextValues);
      const { nextErrors, nextIsValid } = validateForm(nextValues);
      setErrors(nextErrors);
      setIsValid(nextIsValid);
    },
    [validateForm, values],
  );

  const resetForm = useCallback(
    (newValues = defaultValues) => {
      setValues(newValues);
      setErrors({});
      setIsValid(false);
    },
    [defaultValues],
  );

  return {
    values,
    setValues,
    errors,
    isValid,
    handleChange,
    resetForm,
    validateForm,
  };
}
