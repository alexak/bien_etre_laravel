
import { useState } from "react";
import LoginForm from "@/Components/2_molecule/auth/LoginForm";
import ForgotPassword from "@/Components/2_molecule/auth/ForgotPassword";
import NewAccount from "@/Components/2_molecule/auth/NewAccount";

export default function Auth() {

    const [activeForm, setActiveForm] = useState('login');

    return (
        <div className="w-full bg-gradient-to-br from-customBlue-400 to-customBlue-300 flex flex-col pt-12">
            <div className="h-[300px] w-full flex flex-col content-center">
                {activeForm === 'newAccount' && <NewAccount />}
                {activeForm === 'login' && <LoginForm setActiveForm={setActiveForm} />}
                {activeForm === 'forgotPassword' && <ForgotPassword />}
            </div>
            <div className="w-full flex justify-end bg-bottom bg-no-repeat bg-[url('/images/wave.png')]">
                <img
                    className="max-h-[400px]" 
                    src="/images/girl_login_2.png"
                />
            </div>
        </div>
    );
}