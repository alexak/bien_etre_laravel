
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
            <div className="text-white text-center text-3xl font-bold uppercase pb-8">
                mot de passe
            </div>
            <div className="mx-8 pb-4">
                <FormInput 
                    name="email"
                    className='text-white border-white'
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
                    className="p-2 bg-pink-500 text-white normal-case rounded-full text-center text-lg w-full"
                >
                    Envoyer
                </Button>
            </div>
            <div className="text-gray-800 mx-8">
                Mot de passe oublié? Evoyez-vous un lien de reinitialisation sur votre boite mail.
            </div>
        </form>
    );
}