

import FormInput from "@/Components/1_atom/FormInput";
import InputError from "@/Components/InputError";
import { faUser, faAt } from '@fortawesome/free-solid-svg-icons';
import { useForm, router } from "@inertiajs/react";
import { Button, Checkbox } from "@material-tailwind/react";
import { FormEventHandler, useEffect, useState } from "react";

export default function NewAccount({ setActiveForm }) {
    const canResetPassword = true;
    const { data, setData, post, processing, errors, reset, clearErrors, setError } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isValidated, setIsValidated] = useState(false);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        console.log(data);

        router.visit(route('user.register'), {
            method: 'post',
            data: data,
            preserveState: true,
            preserveScroll: true,
            onSuccess: page => {
                setIsValidated(true);
                clearErrors(); 
            },
            onError: (errors) => {
                Object.keys(errors).forEach((key) => {
                    setError(key, errors[key]);
                });
                //console.error(errors);
            },
        })
    };
    
    const handleChange = (attribute, value) =>  {
        setData(attribute, value);
        setIsSubmitted(false);
    }


    return (
        <>
            {isValidated ? (
                <div className="flex flex-row items-center px-8 pb-10">
                    <img
                        className="h-[130px] w-[130px] mr-4"
                        src="/images/icons/animated/email.gif"
                        alt="" 
                        width="130" 
                        height="130"
                    />
                    <div className="text-gray-600">
                        Bienvenue dans notre communauté. Nous vous avons envoyé un mail. Merci de cliquer sur le lien envoyé afin de valider votre adresse mail. 
                    </div>
                </div>
            ) : (
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
                        />
                    </div>
                    <div className='pb-4 mx-8'>
                        <FormInput 
                            className='text-gray-600 border-gray-300 focus:border-gray-400'
                            placeholder='Confirmation mot de passe'
                            name="password_confirmation"
                            inputType='password'
                            error={errors.password_confirmation}
                            isSubmitted={isSubmitted}
                            parentOnChange={ handleChange }
                        />
                    </div>
                    <div className="mx-8 mb-2">
                        <Button
                            type="submit" 
                            className="w-full p-2 text-lg text-center text-white uppercase bg-pink-500 rounded-lg"
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
            )}
        </>
    );
}



