

import CommerceCard from "@/Components/2_molecule/commerces/CommerceCard";
import { Link, usePage } from "@inertiajs/react";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import React from "react";

/**
 * Default rendering pages for commerces views such as search result, categories, favorites.. 
 * 
 * @returns 
 */
export default function Commerces({commerces}){

    const [displayMode, setDisplayMode] = React.useState('card');

    return (
        <div className="flex flex-row w-full min-h-screen">
                
            {/** Filter sidebar */}
            <div className="flex flex-col h-full w-[200px]">
                <div>distance</div>
                <div>tagcloud ?</div>
                <div>price?</div>
                <div>{displayMode}</div>
            </div>

            {/** Main content */}
            <div className="flex flex-col">
                
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
                <div className="grid w-full grid-flow-row grid-cols-5 gap-4">
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
        </div>
    );
}