
import { useState } from "react";
import { Link } from "@inertiajs/react";
import LoginForm from "@/Components/2_molecule/auth/LoginForm";
import ForgotPassword from "@/Components/2_molecule/auth/ForgotPassword";
import NewAccount from "@/Components/2_molecule/auth/NewAccount";
import Logo from "@/Components/0_proton/Logo";

export default function Auth({authform}) {

    const [activeForm, setActiveForm] = useState(authform);

    return (
        <div className="w-full h-screen flex flex-col content-end">
            <div className="lg:flex lg:flex-row flex-grow">
                <div className="w-full lg:w-2/3">
                    <div className="flex flex-col justify-center items-center h-screen md:px-20 lg:m-0 bg-gradient-to-br  from-customBlue-400 to-customBlue-300 ">
                        <Logo className="w-[100px] h-[100px] fill-white" />
                        {activeForm === 'newAccount' && <NewAccount />}
                        {activeForm === 'login' && <LoginForm setActiveForm={setActiveForm} />}
                        {activeForm === 'forgotPassword' && <ForgotPassword />}
                    </div>
                </div>
                <div className="bg-orange-300 w-full lg:w-1/3 justify-end items-end hidden lg:flex">
                    <img
                        className="h-[300px] lg:h-[500px] xl:h-screen" 
                        src="/images/girl_login_2.png"
                    />
                </div>
            </div>
        </div>
    );
}
