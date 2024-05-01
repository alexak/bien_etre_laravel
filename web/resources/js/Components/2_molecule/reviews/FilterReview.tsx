
import React, { useEffect } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Menu, MenuHandler, MenuList, Checkbox, MenuItem } from "@material-tailwind/react";
import Rating from "@/Components/1_atom/Rating";


export default function FilterReview({ parentFilterRates, setParentFilterRates }){

    const [openSort, setopenSort] = React.useState(false);
    const [filterRates, setFilterRates] = React.useState(parentFilterRates);

    const handleToggle = (index) => {
        setFilterRates(prevRates => ({
            ...prevRates,
            [index]: !prevRates[index] 
        }));
    };

    useEffect(() => {
        setParentFilterRates(filterRates);
    }, [filterRates]);

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
                        Filtrer par
                    </span>
                    <FontAwesomeIcon
                        className={`h-3.5 w-3.5 transition-transform ${openSort ? "rotate-180" : ""}`} 
                        icon={faChevronDown}
                    />  
                </Button>
            </MenuHandler>

            <MenuList className="flex flex-col p-4 hover:border-0">
                {Object.entries(filterRates).map(([key, value]) => (
                    <MenuItem 
                        key={key} 
                        className="p-0"
                    >
                        <label
                            htmlFor={`item-${key}`}
                            className="flex items-center gap-2 p-2 cursor-pointer"
                        >
                            <Checkbox
                                ripple={false}
                                id={`item-${key}`}
                                defaultChecked={value}
                                containerProps={{ className: "p-0" }}
                                className="hover:before:content-none checked:bg-pink-500 checked:border-gray-300"
                                onClick={() => handleToggle(key)}
                            />
                            <Rating 
                                readonly
                                value={parseInt(key, 10)}
                                showNumbers={false}
                            />
                        </label>
                    </MenuItem>
                ))}
            </MenuList>
       </Menu>
    )
}                       

