
import React, { useState } from 'react';
import { 
    faStar as faStarSolid,
    faArrowsLeftRight,
    faHouse,
    faShop,
} from '@fortawesome/free-solid-svg-icons';
import {faStar as faStarRegular,} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from "@material-tailwind/react";
import Card, { CardBody, CardFooter, CardHeader } from '@material-tailwind/react/components/Card';
import { Link, usePage } from '@inertiajs/react';
import FavIcon from '@/Components/1_atom/FavIcon';
import SocialmediaShare from '@/Components/1_atom/SocialmediaShare';


// Define an interface for the component's props
interface ServiceProvider {
    data: {
      id: number;
      image: string;
      category: string;
      rating: number;
      name: string;
      distance: number;
      price: number;
      isAtHome: boolean;
      isAtStore: boolean;
    };
  }

const CommerceCard = ({ commerce } ) => {

    return (
        <Card className="w-full max-w-[26rem] shadow-lg p-4 rounded-lg">
            <CardHeader 
                floated={false} 
                color="blue-gray"
                className="relative mx-0 mt-0"
            >
                <img
                    className="w-full h-full rounded-lg"
                    src={commerce.image}
                    alt={commerce.name}
                />
                <FavIcon 
                    className='absolute flex items-center justify-center w-6 h-6 rounded-full cursor-pointer bg-white/75 align-center top-1 right-1'
                    commerce={commerce}
                />
            </CardHeader>
            <CardBody className="relative px-0 h-[140px]">
                <div className="flex flex-row justify-between">
                    <div>
                        <Link
                            href={route('category', commerce.main_category.slug)} 
                            className="text-xs font-medium text-gray-500 uppercase hover:text-gray-700"
                        >
                            {commerce.main_category.title}
                        </Link>
                    </div>
                    <div>
                        <FontAwesomeIcon 
                            icon={commerce.rating == null ? faStarRegular : faStarSolid} 
                            className="w-4 h-4 pr-2 text-gray-400" 
                        />
                        {commerce.rating}
                    </div>
                </div>

                <div className="w-full text-lg font-bold">
                    <Link href={route('commerce', commerce.slug)} >
                        {commerce.name}
                    </Link>
                </div>
             

                <div className='absolute left-0 z-10 flex flex-row content-center w-full h-6 bottom-2'>
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
            </CardBody>
        </Card>
    );
}

export default CommerceCard;
