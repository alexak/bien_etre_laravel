
import React from "react";
import CommerceCard from "@/Components/2_molecule/commerces/CommerceCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { router } from '@inertiajs/react'
import CommerceList from "@/Components/2_molecule/commerces/CommerceList";
import CommerceMap from "@/Components/2_molecule/commerces/CommerceMap";
import Sort from "@/Components/1_atom/Sort";


/**
 * Default rendering pages for commerces views such as search result, categories, favorites.. 
 * 
 * @returns 
 */
export default function Commerces({commerces}){

    const [displayMode, setDisplayMode] = React.useState('card');
    const [pageCommerces, setPageCommerces] = React.useState(commerces);
    
    return (
        <>    
            {/** Main content */}
            <div className="flex flex-col justify-center w-full min-h-screen py-8">
                
                {/** Header */}
                <div className="flex flex-row justify-between">
                    {/** Header left */}
                    <div>
                        <Sort setPageCommerces={setPageCommerces} /> 
                    </div>

                    {/** Header right */}
                    <div className="flex flex-row justify-end">
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
                </div>

                {/** Commerces as cards */}
                {displayMode === 'card' && (
                    <div className="grid justify-center w-full grid-rows-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                        {pageCommerces.map((commerce) => (
                            <CommerceCard key={commerce.id} commerce={commerce} />
                        ))}
                    </div>
                    )}

                {displayMode === 'map' && <CommerceMap commerces={commerces} />}
        
            </div>
        </>
    );
}
