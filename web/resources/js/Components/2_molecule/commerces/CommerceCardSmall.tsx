
import { 
    faArrowsLeftRight,
    faHouse,
    faShop,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from "@material-tailwind/react";
import { Link } from '@inertiajs/react';
import FavIcon from '@/Components/1_atom/FavIcon';


export default function CommerceCardSmall({commerce}){
    return (
        <>
            <div className='flex flex-col w-full p-2'>
                <div className='relative mb-4'>
                    <img
                        className="w-full h-full rounded-lg"
                        src={commerce.image}
                        alt={commerce.name}
                    />
                    <FavIcon 
                        className='absolute flex items-center justify-center w-6 h-6 rounded-full cursor-pointer bg-white/75 align-center top-1 right-1'
                        commerce={commerce}
                    />
                </div>
                <div className="w-full font-bold text-clip">
                    <Link href={route('commerce', commerce.slug)} >
                        {commerce.name}
                    </Link>
                </div>
                    <div className='flex flex-row'>
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
        </>
    );
}
