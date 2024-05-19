
import FormInput from "@/Components/1_atom/FormInput";
import { faUser} from '@fortawesome/free-solid-svg-icons';
import { Button } from "@material-tailwind/react";
import { useForm, router } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';


export default function ForgotPassword() {

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });
    
    const [isSubmitted, setIsSubmitted] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        router.visit(route('password.email'), {
            method: 'post',
            data: data,
            preserveState: true,
            preserveScroll: true,
            onSuccess: page => {
                console.log('page');
                console.log(page);
            },
            onError: errors => {
                console.error(errors);
            },
        })

        setIsSubmitted(true);
    };
    
    const handleChange = (attribute, value) =>  {
        setData(attribute, value);
        setIsSubmitted(false);
    }


    return (
        <>
            {isSubmitted ? (
            <div className="flex flex-row items-center px-8 pb-10">
                <img
                    className="h-[130px] w-[130px] mr-4"
                    src="/images/icons/animated/email.gif"
                    alt="" 
                    width="130" 
                    height="130"
                />
                <div className="text-gray-600">
                    Si vous avez un compte existant, un e-mail pour réinitialiser votre mot de passe a été envoyé. Veuillez vérifier votre boîte de réception ainsi que vos spams. Cliquez sur le lien dans l'e-mail pour pouvoir changer votre mot de passe.
                </div>
            </div>
            ) : (
                <form 
                    onSubmit={submit}
                    className="w-full"
                >
                    <div className="pb-2 text-3xl font-bold text-center text-gray-600 uppercase">
                        mot de passe
                    </div>
                    <div className="pb-8 mx-8 text-center text-gray-600">
                        Mot de passe oublié? Evoyez-vous un lien de reinitialisation sur votre boite mail.
                    </div>
                    <div className="pb-4 mx-8">
                        <FormInput 
                            name="email"
                            className='text-gray-600 border-gray-300 focus:border-gray-400'
                            placeholder='E-mail / nom utilisateur'
                            icon={faUser}
                            error={errors.email}
                            parentOnChange={handleChange}
                            isSubmitted={isSubmitted}
                            onBlur={() =>setIsSubmitted(false)}
                        />
                    </div>
                    <div className="mx-8 mb-12">
                        <Button
                            type="submit" 
                            className="w-full p-2 text-lg text-center text-white uppercase bg-pink-500 rounded-lg"
                        >
                            Envoyer
                        </Button>
                    </div>
                </form>
            )}
        </>
    );
}