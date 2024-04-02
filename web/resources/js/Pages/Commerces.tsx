
import CommerceCard from "@/Components/2_molecule/commerces/CommerceCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { router } from '@inertiajs/react'


/**
 * Default rendering pages for commerces views such as search result, categories, favorites.. 
 * 
 * @returns 
 */
export default function Commerces({commerces}){

    const [displayMode, setDisplayMode] = React.useState('card');
    const [openFilter, setopenFilter] = React.useState(false);
    const [pageCommerces, setPageCommerces] = React.useState(commerces);
    
    const getCommerces = (attribute = '', direction = 'asc') => {

        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete('sortBy');
        currentUrl.searchParams.delete('sortDirection');
      
        if (attribute !== ''){
            // Add a new parameter
            currentUrl.searchParams.append('sortBy', attribute);
            currentUrl.searchParams.append('sortDirection', direction);
        }

        router.visit(currentUrl, {
            only: ['commerces'],
            onSuccess: (page) => {
                setPageCommerces(page.props.commerces);
            }
        })
    }


    return (
        <>    
            {/** Main content */}
            <div className="flex flex-col justify-center w-full min-h-screen py-8">
                
                {/** Header */}
                <div className="flex flex-row justify-between">
                    {/** Header left */}
                    <div>
                        <Menu 
                            open={openFilter}
                            handler={setopenFilter}
                            placement="bottom-start"
                            offset={3}
                            allowHover
                        >
                            <MenuHandler>
                            <Button 
                                variant="text"
                                ripple={false}
                                className="text-base text-gray-500 hover:text-gray-700 focus-visible:border-none focus-visible:border-0"
                            >
                                <span className="pr-4">
                                    Tri
                                </span>
                                <FontAwesomeIcon
                                    className={`h-3.5 w-3.5 transition-transform ${openFilter ? "rotate-180" : ""}`} 
                                    icon={faChevronDown}
                                />  
                            </Button>
                            </MenuHandler>
                            <MenuList className="p-6">
                                <MenuItem>
                                    <div
                                        onClick={()=>getCommerces('name', 'asc')} 
                                        className="flex flex-row items-center h-6 text-gray-500 hover:text-gray-700"
                                    >
                                        <img
                                            className="w-[20px] h-[20px] mr-2" 
                                            src="/images/icons/arrow-down-a-z.svg" 
                                            alt="" 
                                            width="20" 
                                            height="20"
                                        />
                                        <span>Trier par nom A {`>`} Z</span>
                                    </div>
                                </MenuItem>
                                <MenuItem>
                                    <div 
                                        onClick={()=>getCommerces('name', 'desc')} 
                                        className="flex flex-row items-center h-6 text-gray-500 hover:text-gray-700">
                                        <img
                                            className="w-[20px] h-[20px] mr-2" 
                                            src="/images/icons/arrow-up-z-a.svg" 
                                            alt="" 
                                            width="20" 
                                            height="20"
                                        />
                                        <span>Trier par nom Z {`>`} A</span>
                                    </div>
                                </MenuItem>
                                <MenuItem>
                                    <div
                                        onClick={()=>getCommerces('distance', 'asc')}  
                                        className="flex flex-row items-center h-6 text-gray-500 hover:text-gray-700">
                                        <img
                                            className="w-[20px] h-[20px] mr-2" 
                                            src="/images/icons/arrow-down-short-wide.svg" 
                                            alt="" 
                                            width="20" 
                                            height="20"
                                        />
                                        <span>Trier par distance plus proche {`>`} plus éloigné</span>
                                    </div>
                                </MenuItem>
                                <MenuItem>
                                    <div
                                        onClick={()=>getCommerces('distance', 'desc')} 
                                        className="flex flex-row items-center h-6 text-gray-500 hover:text-gray-700">
                                        <img
                                            className="w-[20px] h-[20px] mr-2" 
                                            src="/images/icons/arrow-up-wide-short.svg" 
                                            alt="" 
                                            width="20" 
                                            height="20"
                                        />
                                        <span>Trier par plus éloigné {`>`} plus proche</span>
                                    </div>
                                </MenuItem>
                            </MenuList>
                        </Menu>
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
                </div>

                {/** Categories list */}
                <div className="grid justify-center w-full grid-rows-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {pageCommerces.map((commerce) => {
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
