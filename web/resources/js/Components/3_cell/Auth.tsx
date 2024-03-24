
import { useState } from "react";
import { Link } from "@inertiajs/react";
import LoginForm from "@/Components/2_molecule/auth/LoginForm";
import ForgotPassword from "@/Components/2_molecule/auth/ForgotPassword";
import NewAccount from "@/Components/2_molecule/auth/NewAccount";
import Logo from "@/Components/0_proton/Logo";

export default function Auth() {

    const [activeForm, setActiveForm] = useState('login');

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


/*
<div className="w-full h-screen bg-gradient-to-br from-customBlue-400 to-customBlue-300 relative pt-32">
<div className="h-[300px] xl:h-screen bg-green-400 w-full xl:w-1/2 2xl:w-2/3 2xl:px-32 flex flex-col xl:justify-center absolute top-0 left-0 pt-8 xl:pt-0 z-20">

</div>
<div className="absolute bottom-0 right-0 max-h-[400px] xl:max-h-[800px] pt-32 z-20">
    <img
        className="max-h-[400px] xl:max-h-[800px] " 
        src="/images/girl_login_2.png"
    />
</div>
<div className="w-full h-screen bg-bottom bg-no-repeat bg-[url('/images/wave.png')] absolute bottom-0 left-0 z-10">
</div>
</div>
*/
/*
            <div className="w-full xl:w:1/2 2xl:w-2/3 xl:px-12 2xl:px-40 bg-green-500">
                <div className="flex justify-center items-center h-[300px] my-12 lg:py-0 lg:h-screen w-full bg-blue-400">
                    {activeForm === 'newAccount' && <NewAccount />}
                    {activeForm === 'login' && <LoginForm setActiveForm={setActiveForm} />}
                    {activeForm === 'forgotPassword' && <ForgotPassword />}
                </div>
            </div>
            <div className="bg-orange-300 w-full xl:w:1/2 2xl:w-1/3">
                <img
                    className="h-[300px] xl:max-h-screen float-right" 
                    src="/images/girl_login_2.png"
                />
            </div>
            */