import { useState } from 'react';

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  const reset = () => {
    setValues(initialValues);
  }

  return {
    values,
    onChange,
    reset,
    setValues
  };
}