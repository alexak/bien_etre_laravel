
import React from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { router } from "@inertiajs/react";
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";



export default function Sort({commerces}){

    const [openSort, setopenSort] = React.useState(false);

    const getCommerces = (sortBy = '', direction = 'asc') => {
        commerces.setCommerces((prev) => ({
            ...prev,
            'sort': {
                'sortBy': sortBy,
                'sortDirection': direction
            },
        }));
    }

    return (
        <Menu 
            open={openSort}
            handler={setopenSort}
            placement="bottom-start"
            offset={3}
            allowHover
        >
            <MenuHandler>
                <Button 
                    variant="text"
                    ripple={false}
                    className="px-0 text-base text-gray-500 hover:text-gray-700 focus-visible:border-none focus-visible:border-0"
                >
                    <span className="pr-4">
                        Tri
                    </span>
                    <FontAwesomeIcon
                        className={`h-3.5 w-3.5 transition-transform ${openSort ? "rotate-180" : ""}`} 
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
    )
}