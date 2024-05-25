
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
import { useEffect, useState } from "react";
import DirectionStep from "@/Components/2_molecule/DirectionStep";
import DistanceTime from "@/Components/1_atom/DistanceTime";



export default function RoutesDirections({ routesProps }){

    const [openModeSelect, setOpenModeSelect] = useState(false);
    const { data:routes, setRoutes } = routesProps;
    const [modes , setModes] = useState(
        {
            'driving':faCar,
            'cycling':faPersonBiking,
            'walking':faPersonWalking,
        }
    );

    const setAttribute = (attribute, value) => {
        if (attribute=='mode'){
            setModes(value);
        }
        setRoutes((prevRoutes) => ({
          ...prevRoutes,
          [attribute]: value,
        }));
    };

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
                    onClick={()=>setAttribute('routes', null)}
                >
                    <FontAwesomeIcon 
                        className="text-gray-400 "
                        icon={faCircleXmark}
                        size="lg"
                    />
                </div>
            </div>

            <div className="h-[80px] md:h-max flex flex-row items-center p-2 border-2 border-solid rounded-lg mb-2">
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
                                        icon={modes[routes.trip.mode]}
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
                                arrayKey !== routes.trip.mode && ( 
                                    <MenuItem key={arrayKey}>
                                        <div onClick={() => setAttribute('trip.mode', arrayKey)}>
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
                    <div className="">
                        <ButtonGroup 
                            variant="text"
                            className="flex flex-row pb-2 md:flex-col xl:flex-row"
                        >
                            {routes.alternatives.map((route, index) => (
                                <Button
                                    key={index}
                                    onClick={() => setAttribute('activeRouteIndex', index)}
                                    className={`${index==routes.activeRouteIndex ? 'text-pink-500' : 'text-gray-500'} hover:text-gray-700 text-sm px-2`}
                                >
                                    { index==routes.activeRouteId ? (
                                        <>Route par {routes.alternatives[routes.activeRouteIndex].legs[0].summary}</>
                                    ) : (
                                        <>Route {index + 1}</>
                                    )}
                                </Button>
                            ))}
                        </ButtonGroup> 
                    </div>
                    <div className="flex flex-row pl-2">
                        <DistanceTime 
                          distance={routes.alternatives[routes.activeRouteIndex].distance}
                          duration={routes.alternatives[routes.activeRouteIndex].duration}
                        />
                    </div> 
                </div>
            </div>

            { routes.alternatives[routes.activeRouteIndex].legs[0].steps.map((step, index) => (
                <DirectionStep
                    key={index} 
                    step={step}
                    routesProps={routesProps}
                />
            )
            )}

        </div>
    );
}