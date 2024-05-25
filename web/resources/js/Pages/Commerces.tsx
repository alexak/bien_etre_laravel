
import React from "react";
import CommerceCard from "@/Components/2_molecule/commerces/CommerceCard";
import CommerceMapList from "@/Components/4_organism/CommerceMapList";
import Sort from "@/Components/1_atom/Sort";


/**
 * Default rendering pages for commerces views such as search result, categories, favorites.. 
 * 
 * @returns 
 */
export default function Commerces({initialCommerces}){

    const [displayMode, setDisplayMode] = React.useState('card');
    const [commerces, setCommerces] = React.useState(initialCommerces);

    const commercesProps = {
        data: commerces,
        setCommerces: setCommerces,
    };
    
    return (
        <>    
            {/** Main content */}
            <div className="flex flex-col justify-start w-full min-h-screen">
                
                {/** Header */}
                <div className="flex flex-row justify-between py-4">
                    {/** Header left */}
                    <div>
                        <Sort setPageCommerces={setCommerces} /> 
                    </div>

                    {/** Header right */}
                    <div className="flex flex-row justify-end">
                        <div 
                            className={`cursor-pointer flex items-center rounded-md hover:bg-gray-200 p-2 mr-4 ${displayMode=='card' ? 'bg-pink-500' : 'bg-gray-100'} `}
                            onClick={()=>setDisplayMode('card')}
                        >
                            <img
                                className={`w-[20px] h-[20px] ${displayMode=='card' ? 'invert' : ''} hover:invert-0`}
                                src="/images/icons/cards.png"
                                alt="" 
                                width="20" 
                                height="20"
                            />
                        </div>
                        <div 
                            className={`cursor-pointer flex items-center rounded-md hover:bg-gray-200 p-2 mr-4 ${displayMode=='map' ? 'bg-pink-500' : 'bg-gray-100'} `}    
                            onClick={()=>setDisplayMode('map')}
                        >
                            <img
                                className={`w-[20px] h-[20px] ${displayMode=='map' ? 'invert' : '' } hover:invert-0`}
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
                    <div className="grid justify-start w-full grid-rows-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                        {commerces.map((commerce) => (
                            <CommerceCard key={commerce.id} commerce={commerce} />
                        ))}
                    </div>
                    )}

                {displayMode === 'map' && 
                    <CommerceMapList commercesProps={commercesProps} />
                }
        
            </div>
        </>
    );
}
