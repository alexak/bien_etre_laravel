
import FormInput from "@/Components/1_atom/FormInput";
import InputError from "@/Components/InputError";
import { faStarOfLife, faUser} from '@fortawesome/free-solid-svg-icons';
import { useForm } from "@inertiajs/react";
import { Button, Checkbox } from "@material-tailwind/react";
import { FormEventHandler, useEffect, useState } from "react";

export default function LoginForm({ setActiveForm }) {
    const canResetPassword = true;
    const { data, setData, post, processing, errors, reset } = useForm({
      email: '',
      password: '',
      remember: false,
    });
  
    const [isSubmitted, setIsSubmitted] = useState(false);


    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
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
                CONNEXION
            </div>
            <div className="mx-8 pb-4">
                <FormInput 
                    name="email"
                    className='text-white border-white'
                    placeholder='E-mail / nom utilisateur'
                    icon={faUser}
                    error={errors.email}
                    isSubmitted={isSubmitted}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() =>setIsSubmitted(false)}
                />
            </div>
            <div className='mx-8 pb-2'>
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
            <div className="ml-10 pb-8">
                {canResetPassword && (
                    <div 
                        onClick={()=>{setActiveForm('forgotPassword')}}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Mot de passe oublié?
                    </div>
                )}
            </div>
            <div className="mx-8 mb-2">
                <Button
                    type="submit" 
                    className="p-2 bg-pink-500 text-white capitalize rounded-full text-center text-lg w-full"
                >
                    Se connecter
                </Button>
            </div>
            <div className="mx-8">
                <Checkbox
                    name="remember"
                    checked={data.remember}
                    onChange={(e) => setData('remember', e.target.checked)}
                    label={
                        <span className="pl-2">Se souvenir de moi</span>
                    }
                    ripple={false}
                />
            </div>
        </form>
    );
}



