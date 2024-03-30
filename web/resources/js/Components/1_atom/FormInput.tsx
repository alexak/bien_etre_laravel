
"use client"

import React, {useEffect, useState} from 'react';
import { 
    faEye,
    faEyeSlash,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { propTypesSelected } from '@material-tailwind/react/types/components/select';


// Define a type for the component props
/*
type FormInputProps = {
    className?: string;
    icon?: any; // Using FontAwesome IconDefinition type
    inputType?: 'text' | 'password';
    placeholder?: string;
    value?: string;
    name?: string;
    error?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isSubmitted?: boolean;
};
*/

export default function FormInput({
    className,
    icon,
    inputType,
    placeholder,
    value,
    name,
    error,
    onBlur,
    parentOnChange,
    isSubmitted,
    
  }) {
  const [placeholderText, setPlaceholderText] = useState(error || placeholder);
  const [errorText, setErrorText] = useState(error);
  const [shown, setShown] = inputType === 'password' ? useState(false) : useState(true);

  const type = inputType === 'text' || shown ? "text" : "password";

  
  let fieldIcon = icon;
  if (inputType === 'password') {
      fieldIcon = shown ? faEye : faEyeSlash;
  }

  // Update placeholder and error state when error prop changes or form is submitted
  useEffect(() => {
    setPlaceholderText(error || placeholder);
    setErrorText(error);
    console.log(isSubmitted);
  }, [error, isSubmitted]);

  const handleOnBlur = (value: string) => {
    setPlaceholderText(value === '' ? placeholder : '');
    onBlur();
  };

  const handleChange = (attribute, value) => {
    parentOnChange(attribute, value)
  };


  
  return (
    <div className={`w-full border-2 rounded-full flex flex-row items-center relative px-2 ${className}`}>
      <input
        type={type}
        value={value}
        name={name}
        className="flex-1 mr-3 text-lg bg-transparent border-none rounded-full outline-none focus:ring-0 placeholder:text-inherit"
        placeholder={placeholderText}
        onFocus={() => setPlaceholderText('')}
        onBlur={(e) => handleOnBlur(e.target.value)}
        onChange={(e) => handleChange(name, e.target.value)}
      />
      {inputType === 'password' ? (
        <button onClick={() => setShown(!shown)}>
          <FontAwesomeIcon className="pr-2" icon={fieldIcon}/>
        </button>
      ):(
          <FontAwesomeIcon className="pr-2" icon={fieldIcon}/>
      )}
    </div>
  )
}
