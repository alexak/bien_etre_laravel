
import { 
    faArrowsLeftRight,
    faCar,
    faChevronDown, 
    faCircleXmark, 
    faClock, 
    faPersonBiking, 
    faPersonWalking, 
    faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Menu, MenuHandler, MenuItem, MenuList, Tooltip } from "@material-tailwind/react";
import { useState } from "react";
import DirectionStep from "@/Components/2_molecule/DirectionStep";
import DistanceTime from "@/Components/1_atom/DistanceTime";


// driving-traffic, driving, cycling, walking

export default function RoutesDirections({
    routes,
    unsetRoute,
    parentActiveRoute, 
    setParentActiveRoute,
    parentRouteFromTo,
    setParentRouteFromTo
}){

    const [activeRoute, setActiveRoute] = useState(parentActiveRoute);
    const [openModeSelect, setOpenModeSelect] = useState(false);
    const [routeFromTo, setRouteFromTo] = useState(parentRouteFromTo);
    const [modes , setModes] = useState(
        {
            'driving':faCar,
            'cycling':faPersonBiking,
            'walking':faPersonWalking,
        }
    );

    const changeMode = (mode) => {
        setRouteFromTo((prevRoute) => ({ ...prevRoute, mode:mode}));
        setParentRouteFromTo((prevRoute) => ({ ...prevRoute, mode:mode}));
    }

    const changeActiveRoute = (routeNo) => {
        setActiveRoute(routeNo);
        setParentActiveRoute(routeNo);
    }

    return(
        <div className="flex flex-col w-full h-screen p-4 overflow-y-auto">
            <div className="flex flex-row justify-between mb-4">
                <div>
                    <h1 className="text-xl uppercase font-bolder">
                        Détails de votre trajet:
                    </h1>
                </div>
                <div 
                    className="cursor-pointer"
                    onClick={()=>unsetRoute()}
                >
                    <FontAwesomeIcon 
                        className="text-gray-400 "
                        icon={faCircleXmark}
                        size="lg"
                    />
                </div>
            </div>

            <div className="h-[80px] flex flex-row items-center p-2 border-2 border-solid rounded-lg mb-2">
                <div className="">
                    <Menu 
                        open={openModeSelect}
                        handler={setOpenModeSelect}
                        placement="bottom-start"
                        offset={3}
                        allowHover
                    >
                        <MenuHandler>
                            <Button 
                                variant="text"
                                ripple={false}
                                className="flex flex-row px-0 text-base focus-visible:border-none focus-visible:border-0"
                            >   
                                <div className="">
                                    <FontAwesomeIcon
                                        className="w-[25px] h-[25px] text-gray-500 hover:text-gray-700"
                                        icon={modes[routeFromTo.mode]}
                                    />
                                </div>
                                <FontAwesomeIcon
                                    className={`h-3.5 w-3.5 transition-transform ${openModeSelect ? "rotate-180" : ""}`} 
                                    icon={faChevronDown}
                                />  
                            </Button>
                        </MenuHandler>
                        <MenuList className="p-2 rounded-b-md">
                            {Object.entries(modes).map(([arrayKey, icon]) => (
                                arrayKey !== routeFromTo.mode && ( 
                                    <MenuItem key={arrayKey}>
                                        <div onClick={() => changeMode(arrayKey)}>
                                            <FontAwesomeIcon
                                                className="w-[25px] h-[25px] text-gray-500 hover:text-gray-700"
                                                icon={icon}
                                            />
                                        </div>
                                    </MenuItem>
                                )
                            ))}
                        </MenuList>
                    </Menu> 
                </div>
                <div className="flex flex-col justify-start w-full">
                    <div className="flex flex-row">
                        <ButtonGroup 
                            variant="text"
                            className="pb-2"
                        >
                            {routes.map((route, index) => (
                                <Button
                                    key={index}
                                    onClick={() => changeActiveRoute(index)}
                                    className={`${index==activeRoute ? 'text-pink-500' : 'text-gray-500'} hover:text-gray-700 text-sm px-2`}
                                >
                                    { index==activeRoute ? (
                                        <>Route par {routes[activeRoute].legs[0].summary}</>
                                    ) : (
                                        <>Route {index + 1}</>
                                    )}
                                </Button>
                            ))}
                        </ButtonGroup> 
                    </div>
                    <div className="flex flex-row pl-2">
                        <DistanceTime 
                          distance={routes[activeRoute].distance}
                          duration={routes[activeRoute].duration}
                        />
                    </div> 
                </div>
            </div>

            { routes[activeRoute].legs[0].steps.map((step, index) => (
                <DirectionStep
                    key={index} 
                    step={step}
                />
            )
            )}

        </div>
    );
}