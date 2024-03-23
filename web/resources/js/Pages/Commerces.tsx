
import CommerceCard from "@/Components/3_cell/CommerceCard";
import CommerceList from "@/Components/3_cell/CommerceList";
import CommerceMap from "@/Components/3_cell/CommerceMap";
import { Link } from "@inertiajs/react";
import { IconButton } from "@material-tailwind/react";
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
            <div>
                Todo filder goews here
                <ul>
                    <li>Distance</li>
                    <li>Tagcloud</li>
                    <li>Price</li>
                </ul>
            </div>

            {/** Main body */}
            <div className="flex felx-col">

                {/** Header */}
                <div className="flex flex-row justify-between border-b-2 py-8 m-8 w-full">
                    {/** left box */}
                    <div className="flex flex-row">Filterselect box | Pagination selectbox</div>

                    {/** right box */}
                    <div className="flex flex-row">
                        show as cards | show as list | show as map
                        <IconButton 
                            className={`rounded-md  hover:bg-blue-200 mr-4 ${displayMode}=='card' ? "bg-blue-100" : "bg-blue-50"} `}    
                            onClick={()=>setDisplayMode('card')}
                        >
                            <img src="/images/icons/cards.png" alt="" width="50" height="50" />
                        </IconButton>
                        <IconButton 
                            className={`rounded-md  hover:bg-blue-200 mr-4 ${displayMode}=='list' ? "bg-blue-100" : "bg-blue-50"} `}    
                            onClick={()=>setDisplayMode('list')}
                        >
                            <img src="/images/icons/list.png" alt="" width="50" height="50" />
                        </IconButton>
                        <IconButton 
                            className={`rounded-md  hover:bg-blue-200 ${displayMode}=='map' ? "bg-blue-100" : "bg-blue-50"} `}    
                            onClick={()=>setDisplayMode('map')}
                        >
                            <img src="/images/icons/map.png" alt="" width="50" height="50" />
                        </IconButton>
                    </div>
                </div>

                {/** main content */}
                <div>
                    {/** loop through commerces and display them as cards (either quadratic or rectangular) */}
                    {commerces.map((commerce) => (
                        <Link key={commerce.id} href={`/commerce/${commerce.id}`}>
                            {displayMode === 'call' && <CommerceCard commerce={commerce} />}
                            {displayMode === 'list' && <CommerceList commerce={commerce} />}
                            {displayMode === 'map' && <CommerceMap commerce={commerce} />}
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}