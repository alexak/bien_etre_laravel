

import CommerceCard from "@/Components/2_molecule/commerces/CommerceCard";
import { Link, usePage } from "@inertiajs/react";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import React from "react";



//hidden md:flex flex-row justify-between h-[50px] border-b-2 w-full items-center px-8 md:px-20 lg:px-40

/**
 * Default rendering pages for commerces views such as search result, categories, favorites.. 
 * 
 * @returns 
 */
export default function Commerces({commerces}){

    const [displayMode, setDisplayMode] = React.useState('card');

    return (
        <>    
            {/** Main content */}
            <div className="flex flex-col justify-center w-full min-h-screen">
                
                {/** Header */}
                <div className="flex flex-row justify-end w-full py-8">
    
                        <div 
                            className={`cursor-pointer flex justify-center items-center rounded-md hover:bg-gray-200 p-2 mr-4 ${displayMode=='card' ? "bg-gray-200" : ""} `}
                            onClick={()=>setDisplayMode('card')}
                        >
                            <img
                                className="w-[20px] h-[20px]" 
                                src="/images/icons/cards.png" 
                                alt="" 
                                width="20" 
                                height="20"
                            />
                        </div>

                    <div 
                        className={`cursor-pointer flex justify-center items-center rounded-md hover:bg-gray-200 p-2 mr-4 ${displayMode=='list' ? "bg-gray-200" : ""} `}    
                        onClick={()=>setDisplayMode('list')}
                    >
                        <img
                            className="w-[20px] h-[20px]" 
                            src="/images/icons/list.png" 
                            alt="" 
                            width="20" 
                            height="20"
                        />
                    </div>

                    <div 
                        className={`cursor-pointer flex justify-center items-center rounded-md hover:bg-gray-200 p-2 mr-4 ${displayMode=='map' ? "bg-gray-200" : ""} `}    
                        onClick={()=>setDisplayMode('map')}
                    >
                        <img
                            className="w-[20px] h-[20px]" 
                            src="/images/icons/map.png" 
                            alt="" 
                            width="20" 
                            height="20"
                        />
                    </div>

                </div>

                {/** Categories list */}
                <div className="grid justify-center w-full grid-rows-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {commerces.map((commerce) => {
                        return (
                            <CommerceCard
                                key={commerce.id}
                                commerce={commerce}
                            />
                        );
                    })}
                </div>

            </div>
        </>
    );
}


//grid w-full grid-flow-col grid-cols-1 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-4 md:gap-3 lg:grid-cols-5 lg:gap-4