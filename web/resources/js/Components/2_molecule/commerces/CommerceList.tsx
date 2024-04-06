
import FavIcon from "@/Components/1_atom/FavIcon";
import { 
    faStar as faStarSolid,
    faArrowsLeftRight,
    faHouse,
    faShop,
} from '@fortawesome/free-solid-svg-icons';
import {faStar as faStarRegular,} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, usePage } from '@inertiajs/react';
import SocialmediaShare from "@/Components/1_atom/SocialmediaShare";
import { Button, Tooltip } from "@material-tailwind/react";



export default function CommerceList({commerce, onClick}){
    return (
        <div className="flex flex-row items-center justify-between p-2 m-2 border-2 border-solid rounded-lg">
            <div className="flex flex-row w-full">
                <div className="h-[80px] w-[80px] mr-4 relative">
                    <img
                        className="w-full h-full rounded-lg"
                        src={commerce.image}
                        alt={commerce.name}
                    />
                    <FavIcon 
                        className='absolute flex items-center justify-center w-6 h-6 rounded-full cursor-pointer -top-2 -right-2 bg-white/75 align-center'
                        commerce={commerce}
                    />
                </div>
                <div className="flex flex-col">
                    <div>
                        <Link
                            href={route('category', commerce.main_category.slug)} 
                            className="text-xs font-medium text-gray-500 uppercase hover:text-gray-700"
                        >
                            {commerce.main_category.title}
                        </Link>
                    </div>
                    <div 
                        className="w-full text-lg font-bold cursor-pointer"
                        onClick={() => onClick(commerce)}
                    >
                        {commerce.name}
                    </div>
                    <div className="flex flex-row content-center w-full h-6">
                        { commerce.isAtHome == true && (
                            <div className="pr-4">
                                <Tooltip 
                                        className="text-gray-800 bg-white border-2 border-solid drop-shadow-lg"
                                        content="Prestation en centre"
                                        placement="bottom-start"
                                    >
                                        <FontAwesomeIcon 
                                            className="text-gray-400 "
                                            icon={faHouse}
                                            size="sm"
                                        />
                                </Tooltip>
                            </div>
                        )}
                        { commerce.isAtStore == true && (
                            <div className="pr-4">
                                <Tooltip 
                                    className="text-gray-800 bg-white border-2 border-solid drop-shadow-lg"
                                    content="Prestation en centre"
                                    placement="bottom-start"
                                >
                                    <FontAwesomeIcon 
                                        className="text-gray-400 "
                                        icon={faShop}
                                        size="sm"
                                    />
                                </Tooltip>
                            </div>
                        )}
                        <div className="pr-4">
                            <SocialmediaShare 
                                commerce={commerce} 
                                className="flex-grow"
                            />
                        </div>
                        { commerce.distance !== null && (
                            <div className="pr-4">
                                <Tooltip 
                                    className="text-gray-800 bg-white border-2 border-solid drop-shadow-lg"
                                    content="Distance par rapport votre position"
                                    placement="bottom-start"
                                >
                                    <div className="flex flex-row items-center h-6">
                                        <FontAwesomeIcon 
                                            className="pr-2 text-gray-400"
                                            icon={faArrowsLeftRight}
                                            size="sm"
                                        />
                                        <span className="text-sm">{(commerce.distance/1000).toFixed(1)} km</span>
                                    </div>
                                </Tooltip>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <div className="flex h-full">
                <Link href={route('commerce', commerce.slug)} >
                    <Button className="w-full p-2 px-4 text-lg text-center text-white capitalize bg-pink-500 rounded-full">
                        Détails
                    </Button>
                </Link>
            </div>
        </div>
    )
}