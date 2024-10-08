
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
    
    const handleChange = (key, value) =>  {
        setData(key, value);
        setIsSubmitted(false);
    }


    return (
        <form 
            onSubmit={submit}
            className="w-full"
        >
            <div className="pb-8 text-3xl font-bold text-center text-gray-600 uppercase">
                CONNEXION
            </div>

            {/** Information */}
            <div className="flex flex-row items-center px-8 pb-10">
                <img
                    className="h-[30px] w-[30px] mr-4"
                    src="/images/icons/info.png"
                    alt="" 
                    width="30" 
                    height="30"
                />
                <div className="text-gray-600">
                    <span className="mr-4 text-3xl font-bold text-pink-500">Hopla!</span>
                    <span className="font-bolder">Vous devrez être connecté(e) pour utiliser cette fonctionalité</span>
                </div>
            </div>

            <div className="pb-4 mx-8">
                <FormInput 
                    name="email"
                    className='text-gray-600 border-gray-300 focus:border-gray-400'
                    placeholder='E-mail / nom utilisateur'
                    icon={faUser}
                    error={errors.email}
                    isSubmitted={isSubmitted}
                    parentOnChange={ handleChange }
                    onBlur={() =>setIsSubmitted(false)}
                />
            </div>
            <div className='pb-2 mx-8'>
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
            <div className="pb-8 ml-10">
                {canResetPassword && (
                    <div 
                        onClick={()=>{setActiveForm('forgotPassword')}}
                        className="text-sm text-gray-600 underline rounded-md cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Mot de passe oublié?
                    </div>
                )}
            </div>
            <div className="mx-8 mb-2">
                <Button
                    type="submit" 
                    className="w-full p-2 text-lg text-center text-white uppercase bg-pink-500 rounded-lg"
                >
                    Se connecter
                </Button>
            </div>
            <div className="flex flex-row justify-between">
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
                <div 
                    onClick={()=>{setActiveForm('newAccount')}}
                    className="pr-8 text-sm text-gray-600 underline rounded-md cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                    Pas de compte? Enregistrez-vous. 
                </div>
            </div>
        </form>
    );
}



