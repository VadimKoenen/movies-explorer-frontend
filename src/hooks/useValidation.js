import { useState, useCallback } from 'react';
const useValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const email = event.target.email;
    const value = event.target.value;
    const target = event.target;

    setValues({
      ...values,
      [name]: value,
      [email]: value
    });

    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    });

    setValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setValid(newIsValid);
    },
    [setValues, setErrors, setValid]
  );

  return {
    values,
    errors,
    handleChange,
    isValid,
    resetForm,
    setValues,
    setValid,
  };
};

export default useValidation;