
import FormInput from "@/Components/1_atom/FormInput";
import { faStarOfLife, faUser} from '@fortawesome/free-solid-svg-icons';
import { Link } from "@inertiajs/react";
import { Checkbox } from "@material-tailwind/react";

export default function LoginForm() {

    const canResetPassword=true;

    return (
        <>
            <div className="w-full bg-gradient-to-br from-customBlue-400 to-customBlue-300 flex flex-col">
                <div className="min-h-[300px] w-full flex flex-col content-center">
                    <div className="text-white text-center text-3xl font-bold capitalize pt-12 pb-8">CONNEXION</div>
                    <div className="mx-8 pb-4">
                        <FormInput 
                            className='text-white border-white'
                            placeholder='E-mail / nom utilisateur'
                            icon={faUser}
                        />
                    </div>
                    <div className='mx-8 pb-2'>
                        <FormInput 
                            className='text-white border-white'
                            placeholder='Mot de passe'
                            inputType='password'
                            icon={faStarOfLife}
                        />
                    </div>
                    <div className="ml-10 pb-8">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Mot de passe oublié?
                            </Link>
                        )}
                    </div>
                    <div className="mx-8 mb-2 p-2 bg-pink-500 text-white capitalize rounded-full text-center text-lg">
                        Se connecter
                    </div>
                    <div className="mx-8">
                        <Checkbox 
                            id="ripple-off" 
                            label={
                                <span className="pl-2">Se souvenir de moi</span>
                            }
                            ripple={false}
                        />
                    </div>
                </div>
                <div className="w-full flex justify-end bg-bottom bg-no-repeat bg-[url('/images/wave.png')]">
                    <img
                        className="max-h-[400px]" 
                        src="/images/girl_login_2.png"
                    />
                </div>
            </div>

        {/** 
        <div className="w-full h-[500px] p8 bg-bottom bg-no-repeat bg-[url('/images/wave.svg')] flex flex-row justify-between">
            <div className="">
hello
            </div>
            <div>Wolrd</div>
        </div>

    **/}
    </>
    );
}