

import FormInput from "@/Components/1_atom/FormInput";
import InputError from "@/Components/InputError";
import { faUser, faAt } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "@inertiajs/react";
import { Button, Checkbox } from "@material-tailwind/react";
import { FormEventHandler, useEffect, useState } from "react";

export default function NewAccount({ setActiveForm }) {
    const canResetPassword = true;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);


    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
        setIsSubmitted(true);
    };
    
    const handleChange = (attribute, value) =>  {
        setData(attribute, value);
        setIsSubmitted(false);
    }


    return (
        <form 
            onSubmit={submit}
            className="w-full"
        >
            <div className="pb-8 text-3xl font-bold text-center text-gray-600 uppercase">
                Créer un nouveau compte
            </div>
            <div className="pb-4 mx-8">
                <FormInput 
                    name="name"
                    className='text-gray-600 border-gray-300 focus:border-gray-400'
                    placeholder='Nom utilisateur'
                    icon={faUser}
                    error={errors.name}
                    isSubmitted={isSubmitted}
                    parentOnChange={ handleChange }
                    onBlur={() =>setIsSubmitted(false)}
                />
            </div>
            <div className="pb-4 mx-8">
                <FormInput 
                    name="email"
                    className='text-gray-600 border-gray-300 focus:border-gray-400'
                    placeholder='E-mail'
                    icon={faAt}
                    error={errors.email}
                    isSubmitted={isSubmitted}
                    parentOnChange={ handleChange }
                    onBlur={() =>setIsSubmitted(false)}
                />
            </div>
            <div className='pb-4 mx-8'>
                <FormInput 
                    className='text-gray-600 border-gray-300 focus:border-gray-400'
                    placeholder='Mot de passe'
                    name="password"
                    inputType='password'
                    error={errors.password}
                    isSubmitted={isSubmitted}
                    parentOnChange={ handleChange }
                    onBlur={() =>setIsSubmitted(false)}
                />
            </div>
            <div className='pb-4 mx-8'>
                <FormInput 
                    className='text-gray-600 border-gray-300 focus:border-gray-400'
                    placeholder='Confirmation mot de passe'
                    name="password_confirmation"
                    inputType='password'
                    error={errors.password}
                    isSubmitted={isSubmitted}
                    parentOnChange={ handleChange }
                    onBlur={() =>setIsSubmitted(false)}
                />
            </div>
            <div className="mx-8 mb-2">
                <Button
                    type="submit" 
                    className="w-full p-2 text-lg text-center text-white capitalize bg-pink-500 rounded-lg"
                >
                    S'enregistrer
                </Button>
            </div>
            <div 
                onClick={()=>{setActiveForm('login')}}
                className="pl-8 text-sm text-gray-600 underline rounded-md cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
                Déjà membre? Connectez-vous. 
            </div>
        </form>
    );
}



