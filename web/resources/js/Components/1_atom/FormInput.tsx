"use client"

import React, { useEffect, useState } from 'react';
import {
    faEye,
    faEyeSlash,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    const [shown, setShown] = inputType === 'password' ? useState(false) : useState(true);
    const [currentValue, setCurrentValue] = useState(value ?? '');
    const [currentError, setCurrentError] = useState(error);
    const [placeholderText, setPlaceholderText] = useState(error ?? placeholder);
    const [isInitialized, setIsInitialized] = useState(false);

    const type = inputType === 'text' || shown ? "text" : "password";

    let fieldIcon = icon;
    if (inputType === 'password') {
        fieldIcon = shown ? faEye : faEyeSlash;
    }

    useEffect(() => {
      console.log(isSubmitted);
    }, [isSubmitted]);


    useEffect(() => {
      console.log('trigger');
      if(isSubmitted && error){
        setCurrentValue('');
        setCurrentError(error);
        setPlaceholderText(error);
        if (inputType === 'password') {
            setShown(true);
        }
      }
    }, [isSubmitted, error]);

    const handleOnBlur = (e) => {
        setPlaceholderText(placeholder);
        if (onBlur) {
            onBlur(e);
        }
    };

    const handleOnFocus = () => {
      setCurrentError(null);
      setPlaceholderText('');
      if (inputType === 'password') {
        setShown(false);
      }
    };

    const handleChange = (e) => {
        setCurrentValue(e.target.value);
        parentOnChange(name, currentValue);
    };

  
    return (
        <div className={`w-full border rounded-lg flex flex-row items-center relative px-2 ${currentError ? 'bg-red-100' : ''} ${className}`}>
            <input
                type={type}
                value={currentValue}
                name={name}
                className="flex-1 mr-3 text-lg bg-transparent border-none rounded-md outline-none focus:ring-0 placeholder:text-inherit"
                placeholder={placeholderText}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                onChange={handleChange}
            />
            {inputType === 'password' ? (
                <button type="button" onClick={() => setShown(!shown)}>
                    <FontAwesomeIcon className="pr-2" icon={fieldIcon} />
                </button>
            ) : (
                <FontAwesomeIcon className="pr-2" icon={fieldIcon} />
            )}
        </div>
    );
}
