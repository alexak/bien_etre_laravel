
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { Link } from "@inertiajs/react";


export default function UserMenu(){
    return (
        <div className="flex flex-col md:flex-row">
            <Link
                href={route('favorites')} 
                className="flex flex-row items-center pb-4 pr-4 text-gray-800 md:text-gray-500 hover:text-gray-700 md:pb-0"
            >  
            <div className="w-[50px] md:w-max mr-0 md:mr-2">
                <FontAwesomeIcon 
                    className="w-4 h-4" 
                    icon={faHeartRegular}
                />
            </div>
            <div className="leading-4">
                Mes favoris
            </div>
            </Link>
            <Link
                href={route('session.logout')} 
                method="post"
                className="text-gray-800 md:text-gray-500 hover:text-gray-700 flex flex-row items-center h-[50px] pb-8md:pb-0"
            >  
                <div className="w-[50px] md:w-max mr-0 md:mr-2">
                    <img
                        className="h-[20px]" 
                        src="/images/icons/logout.png" 
                        alt="logout"
                    />
                </div>
                <div className="leading-4">
                    Deconnexion
                </div>
            </Link>
        </div>
    );
}