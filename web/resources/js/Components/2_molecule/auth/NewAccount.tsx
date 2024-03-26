

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
    
    const handleChange = (attribute, e) =>  {
        setData(attribute, e.target.value);
        setIsSubmitted(false);
    }


    return (
        <form 
            onSubmit={submit}
            className="w-full"
        >
            <div className="text-white text-center text-3xl font-bold uppercase pb-8">
                Créer un nouveau compte
            </div>
            <div className="mx-8 pb-4">
                <FormInput 
                    name="name"
                    className='text-white border-white'
                    placeholder='Nom utilisateur'
                    icon={faUser}
                    error={errors.name}
                    isSubmitted={isSubmitted}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() =>setIsSubmitted(false)}
                />
            </div>
            <div className="mx-8 pb-4">
                <FormInput 
                    name="email"
                    className='text-white border-white'
                    placeholder='E-mail'
                    icon={faAt}
                    error={errors.email}
                    isSubmitted={isSubmitted}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() =>setIsSubmitted(false)}
                />
            </div>
            <div className='mx-8 pb-4'>
                <FormInput 
                    className='text-white border-white'
                    placeholder='Mot de passe'
                    name="password"
                    inputType='password'
                    error={errors.password}
                    isSubmitted={isSubmitted}
                    onChange={(e) => setData('password', e.target.value)}
                    onBlur={() =>setIsSubmitted(false)}
                />
            </div>
            <div className='mx-8 pb-4'>
                <FormInput 
                    className='text-white border-white'
                    placeholder='Confirmation mot de passe'
                    name="password_confirmation"
                    inputType='password'
                    error={errors.password}
                    isSubmitted={isSubmitted}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    onBlur={() =>setIsSubmitted(false)}
                />
            </div>
            <div className="mx-8 mb-2">
                <Button
                    type="submit" 
                    className="p-2 bg-pink-500 text-white capitalize rounded-full text-center text-lg w-full"
                >
                    S'enregistrer
                </Button>
            </div>
            <div 
                onClick={()=>{setActiveForm('login')}}
                className="pl-8 cursor-pointer underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
                Déjà membre? Connectez-vous. 
            </div>
        </form>
    );
}



