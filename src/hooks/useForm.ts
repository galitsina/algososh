import { useState, ChangeEvent } from 'react';

interface IInputValues {
  [key: string]: string;
}

interface IUseForm {
  values: IInputValues;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues: (values: IInputValues) => void;
}
export function useForm(inputValues: IInputValues): IUseForm {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}
