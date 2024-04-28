
import { useState } from "react";
import { Link } from "@inertiajs/react";
import LoginForm from "@/Components/2_molecule/auth/LoginForm";
import ForgotPassword from "@/Components/2_molecule/auth/ForgotPassword";
import NewAccount from "@/Components/2_molecule/auth/NewAccount";
import Logo from "@/Components/0_proton/Logo";

export default function Auth({authform}) {

    const [activeForm, setActiveForm] = useState(authform);

    return (
        <div className="flex flex-col content-end w-full h-screen">
            <div className="flex-grow lg:flex lg:flex-row">
                <div className="w-full lg:w-2/3">
                    <div className="flex flex-col items-center justify-center h-screen md:px-20 lg:m-0 ">
                        <Logo className="w-[100px] h-[100px] fill-gray-800" />
                        {activeForm === 'newAccount' && <NewAccount setActiveForm={setActiveForm} />}
                        {activeForm === 'login' && <LoginForm setActiveForm={setActiveForm} />}
                        {activeForm === 'forgotPassword' && <ForgotPassword />}
                    </div>
                </div>
                <div className="items-end justify-end hidden w-full bg-gradient-to-br from-customBlue-400 to-customBlue-300 lg:w-1/3 lg:flex rounded-xl">
                    <img
                        className="h-[300px] lg:h-[500px] xl:h-screen" 
                        src="/images/girl_login_2.png"
                    />
                </div>
            </div>
        </div>
    );
}
