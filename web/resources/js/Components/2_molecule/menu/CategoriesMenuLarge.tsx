
import React from 'react';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";


export default function CategoriesMenuLarge({categories, geoParameter}){

    const [openMenuLarge, setOpenMenuLarge] = React.useState(false);


    return (
        <Menu 
            open={openMenuLarge}
            handler={setOpenMenuLarge}
            placement="bottom-start"
            offset={3}
            allowHover
        >
            <MenuHandler>
                <Button 
                    variant="text"
                    ripple={false}
                    className="text-base text-gray-500 normal-case hover:text-gray-700 focus-visible:border-none focus-visible:border-0"
                >
                    <span className="pr-4">
                        Categories
                    </span>
                    <FontAwesomeIcon
                        className={`h-3.5 w-3.5 transition-transform ${openMenuLarge ? "rotate-180" : ""}`} 
                        icon={faChevronDown}
                    />  
                </Button>
            </MenuHandler>
            <MenuList className="w-full max-w-screen-xl">
                <div className="grid w-full grid-cols-3 p-8 outline-none gap-y-2 outline-0">
                    {categories.map((category) => (
                        <MenuItem key={category.id}>
                            <Link
                                key={category.slug} 
                                className="flex flex-row w-full pb-8 text-gray-500 hover:text-gray-700" 
                                href={`/category/${category.slug}?${geoParameter}`}
                            >
                                <img 
                                    src={category.image} 
                                    className='max-w-[50px] max-h-[30px] pr-4'
                                />
                                <div className="flex flex-col">
                                    <div className="font-semibold">
                                        {category.title}
                                    </div>
                                    <div>
                                        {category.description}
                                    </div>
                                </div>
                            </Link>
                        </MenuItem>
                    ))}
                </div>
            </MenuList>
        </Menu>
    )
}