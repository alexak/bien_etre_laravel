
"use client"

import React, {useEffect, useState} from 'react';
import { 
    faEye,
    faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, IconDefinition } from '@fortawesome/react-fontawesome';


// Define a type for the component props
type FormInputProps = {
    className?: string;
    icon?: IconDefinition; // Using FontAwesome IconDefinition type
    inputType?: 'text' | 'password';
    placeholder?: string;
    value?: string;
    name?: string;
    error?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isSubmitted?: boolean;
};

const FormInput: React.FC<FormInputProps> = ({
    className,
    icon,
    inputType,
    placeholder,
    value,
    name,
    error,
    onChange,
    onBlur,
    // Add a prop to indicate if the form has been submitted
    isSubmitted,
  }) => {
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

  
    return (
      <div className={`w-full border-2 rounded-full flex flex-row items-center relative ${className}`}>
        <input
          type={type}
          value={value}
          name={name}
          className="flex-1 rounded-full bg-transparent border-none focus:ring-0 outline-none placeholder:text-inherit mr-3 text-lg"
          placeholder={placeholderText}
          onFocus={() => setPlaceholderText('')}
          onBlur={(e) => handleOnBlur(e.target.value)}
          onChange={onChange}
        />
        {inputType === 'password' && (
          <button onClick={() => setShown(!shown)} className="p-2">
            <FontAwesomeIcon className="pr-2" icon={fieldIcon} />
          </button>
        )}
      </div>
    );
  };
  
  export default FormInput;  