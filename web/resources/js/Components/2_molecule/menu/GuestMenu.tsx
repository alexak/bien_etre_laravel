
import { Link } from "@inertiajs/react";


export default function GuestMenu(){
    return (
        <div className="flex flex-col md:flex-row">
            <Link
                href={route('user.register')}
                className="flex flex-row items-center w-full pb-8 pr-4 text-gray-800 md:text-gray-500 hover:text-gray-700 md:pb-0"
            >
                <div className="w-[50px] md:w-max mr-0 md:mr-2">
                    <img 
                        className="h-[20px]"
                        src="/images/icons/new_user.png" 
                        alt="nouveau user" 
                    />
                </div>
                <div className="leading-4">
                    S'enregistrer
                </div>
            </Link>
            <Link
                href={route('session.login')}
                className="flex flex-row items-center pb-8 text-gray-800 md:text-gray-500 hover:text-gray-700 md:pb-0"
            >
                <div className="w-[50px] md:w-max mr-0 md:mr-2 ">
                    <img 
                        className="h-[20px]"
                        src="/images/icons/login.png" 
                        alt="login" 
                    />
                </div>
                <div className="leading-4">
                    Connexion
                </div>
            </Link>
        </div>
    );
}