
"use client"

import React, {useState} from 'react';
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
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
};

const FormInput: React.FC<FormInputProps> = ({ className, icon, inputType, placeholder, value, name, onChange }) => {

    const [placeholderText, setPlaceholderText] = useState(placeholder);
    const [shown, setShown] = inputType == 'password' ? useState(false) : useState(true);

    const type = inputType=='text' || shown ? "text" : "password";

    let fieldIcon = icon;
    if (inputType == 'password') {
        fieldIcon = shown ? faEye : faEyeSlash;
    }

    const handleOnBlur = (value: string) => {
        if (value === '') {
            setPlaceholderText(placeholder);
        }
    }

    return (
        <div className={`w-full border-2 rounded-full flex flex-row items-center relative ${className}`}>
            <input
                type={type}
                value={value}
                name={name}
                className="flex-1 rounded-full bg-transparent border-none focus:ring-0 outline-none placeholder:text-inherit mr-3 text-lg"
                placeholder={placeholderText}
                onFocus={() => setPlaceholderText('')}
                onBlur={(e) => handleOnBlur(e.target.value) } 
                onChange={onChange}
            />
            <button onClick={() => setShown(!shown)} className="p-2 ">
                <FontAwesomeIcon 
                    className="pr-2" 
                    icon={fieldIcon}
                />
            </button>
        </div>
    );
}

export default FormInput;