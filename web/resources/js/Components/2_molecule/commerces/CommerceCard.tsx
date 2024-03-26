
import React, { useState } from 'react';
import FormInput from '@/components/2-atoms/FormInput/FormInput';
import { 
    faHeart as faHeartSolid,
    faStar as faStarSolid,
    faArrowsLeftRight,
    faHouse,
    faShop,
} from '@fortawesome/free-solid-svg-icons';
import {
    faHeart as faHeartRegular,
  } from '@fortawesome/free-regular-svg-icons';
import { Button } from '@/components/2-atoms/Boutton/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '@material-tailwind/react/components/Tooltip';

import Card, { CardBody, CardFooter, CardHeader } from '@material-tailwind/react/components/Card';
import { IconButton, Typography } from '@material-tailwind/react';
import { usePage } from '@inertiajs/react';


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

    console.log(commerce);

    const favIcon = commerce.isFavorite ? faHeartSolid : faHeartRegular;

    return (
        <Card className="w-full max-w-[26rem] shadow-lg p-4 rounded-lg">
            <CardHeader 
                floated={false} 
                color="blue-gray"
                className="relative"
            >
                <img
                    className="rounded-lg w-full h-full"
                    src={commerce.image}
                    alt={commerce.name}
                />
                <FontAwesomeIcon 
                    className={`h-4 w-4 absolute top-2 right-2 ${commerce.isFavorite ? 'text-pink-500' :  'text-white' } `} 
                    icon={favIcon}
                />
            </CardHeader>
            <CardBody>
                Hello world
            </CardBody>
        </Card>
    );
}

export default CommerceCard;


/*
        <Card className="w-full max-w-[26rem] shadow-lg">
            <CardHeader 
                floated={false} 
                color="blue-gray"
            >
                <img src={commerce.image} />
                <FontAwesomeIcon 
                    icon={favIcon} 
                    className={`w-5 h-5 pl-2 absolute top-2 right-2 ${commerce.isFavorite ? 'text-red-500' : 'text-white'} `} 
                />
            </CardHeader>
            <CardBody>
                <div className="flex justify-between">
                    <div className='text-sm font-semibold text-gray-400'>{commerce.category}</div>
                    <div className="flex">
                        <FontAwesomeIcon 
                            icon={faStarSolid} 
                            className="w-5 h-5 pl-2 top-2 right-2 text-gray-800 pr-2" 
                        />
                        {commerce.rating}
                    </div>
                </div>
                <div className="pb-4">
                    {commerce.name}
                </div>
                <div className="flex flex-row">
                    {commerce.isAtStore && (
                        <Tooltip content="Prestation en centre">
                            <FontAwesomeIcon 
                                icon={faShop} 
                                className="cursor-pointer w-5 h-5 p-2 text-gray-600 mr-2 rounded-full bg-orange-100 hover:bg-orange-200" 
                            />
                        </Tooltip>
                    )}
                    {commerce.isAtHome && (
                        <Tooltip content="Prestation au domicile du client">
                            <FontAwesomeIcon 
                                icon={faHouse} 
                                className="cursor-pointer w-5 h-5 p-2 text-gray-600 mr-2 rounded-full bg-orange-100 hover:bg-orange-200" 
                            />
                        </Tooltip>
                    )}
                    <div className="flex flex-row items-center h-[40px]">
                        <Tooltip content="Distance">
                            <FontAwesomeIcon 
                                icon={faArrowsLeftRight} 
                                className="w-5 h-5 p-2 text-gray-600 mr-2 rounded-full bg-orange-100 hover:bg-orange-200" 
                            />
                        </Tooltip>
                        <div className="leading-none">
                            {commerce.distance} km
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>

        */