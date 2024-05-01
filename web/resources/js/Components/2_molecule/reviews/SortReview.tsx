
import React from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";


export default function SortReview({ 
    commerce, 
    sort 
}){

    const [openSort, setopenSort] = React.useState(false);

    const handleSortChange = (attribute, direction) => {
        sort(attribute, direction); // This calls handleSort from the parent with the new values
    };

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
                    className="px-0 text-base text-gray-500 hover:text-gray-700 focus-visible:border-none focus-visible:border-0 hover:bg-white"
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

            <MenuList className="p-4">
                <MenuItem>
                    <div
                        onClick={()=>handleSortChange('rating', 'asc')} 
                        className="flex flex-row items-center h-6 text-gray-500 hover:text-gray-700"
                    >
                        <img
                            className="w-[20px] h-[20px] mr-2" 
                            src="/images/icons/sort_numbers_up.png" 
                            alt="" 
                            width="20" 
                            height="20"
                        />
                        <span>Trier par note 1 {`>`} 5</span>
                    </div>
                </MenuItem>
                <MenuItem>
                    <div
                        onClick={()=>handleSortChange('rating', 'desc')} 
                        className="flex flex-row items-center h-6 text-gray-500 hover:text-gray-700"
                    >
                        <img
                            className="w-[20px] h-[20px] mr-2" 
                            src="/images/icons/sort_numbers_down.png" 
                            alt="" 
                            width="20" 
                            height="20"
                        />
                        <span>Trier par note 5 {`>`} 1</span>
                    </div>
                </MenuItem>

                <MenuItem>
                    <div
                        onClick={()=>handleSortChange('created_at', 'desc')}  
                        className="flex flex-row items-center h-6 text-gray-500 hover:text-gray-700">
                        <img
                            className="w-[20px] h-[20px] mr-2" 
                            src="/images/icons/arrow-down-short-wide.svg" 
                            alt="" 
                            width="20" 
                            height="20"
                        />
                        <span>Trier par plus récent {`>`} plus vieux</span>
                    </div>
                </MenuItem>
                <MenuItem>
                    <div
                        onClick={()=>handleSortChange('created_at', 'asc')} 
                        className="flex flex-row items-center h-6 text-gray-500 hover:text-gray-700">
                        <img
                            className="w-[20px] h-[20px] mr-2" 
                            src="/images/icons/arrow-up-wide-short.svg" 
                            alt="" 
                            width="20" 
                            height="20"
                        />
                        <span>Trier par plus vieux {`>`} plus récent</span>
                    </div>
                </MenuItem>


            </MenuList>
        </Menu>
    )
}