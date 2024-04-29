
import FormInput from "@/Components/1_atom/FormInput";
import { faUser} from '@fortawesome/free-solid-svg-icons';
import { Button } from "@material-tailwind/react";
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';


export default function ForgotPassword() {

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });
    
    const [isSubmitted, setIsSubmitted] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        post(route('password.email'));
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
                    onChange={(e) => setData('email', e.target.value)}
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
    );
}