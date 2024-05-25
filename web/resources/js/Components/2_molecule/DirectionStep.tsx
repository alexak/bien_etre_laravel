
import DistanceTime from "@/Components/1_atom/DistanceTime";


export default function DirectionStep({
    step,
    routesProps
}){

    const getManeuverIcon = (maneuver) => {
        let image = "";
        let className = "";
        switch(maneuver.type){
            case('depart') : image = 'flag_green.png'; break;
            case('arrive') : image = 'arrival.png'; break;
            case('merge') : image = 'merge_3.png'; break;
            case('end of road') : image = 'dead-end-street.png'; break;
            case('roundabout') : image = 'roundabout.png'; break;
            case('rotary') : image = 'roundabout.png'; break;
            case('roundabout turn') : image = 'roundabout.png'; break;
            case('turn') :
            case('new name'):
            case('continue'):
                switch(maneuver.modifier){
                    case('uturn'): image = 'uturn.png'; break;
                    case('sharp right'): 
                        image = 'right-up.png';
                        className = 'scale-y-[-1]'
                        break;
                    case('right'): image = 'right.png'; break;
                    case('slight right'): image = 'right-up.png';break;
                    case('straight') : image = 'straigt.png'; break;
                    case('slight left'): 
                        className = 'scale-x-[-1]'
                        image = 'right-up.png';
                        break;
                    case('left'): 
                        className = 'scale-x-[-1]'
                        image = 'right.png';
                        break;
                    case('sharp left'): 
                        className = 'scale-x-[-1] scale-y-[-1]'
                        image = 'right-up.png';
                        break;
                }
                break;
            case('on ramp'):
                switch(maneuver.modifier){
                    case('slight left'):
                        image = 'merge.png';
                        className = 'scale-x-[-1]'
                        break;
                    case('slight right'):
                        image = 'merge.png';
                        break;
                }
                break;
            case('off ramp'): image = 'split-right.png'; break;
            case('fork'):
                switch(maneuver.modifier){
                    case('slight left'):
                        image = 'split-right.png';
                        className = 'scale-x-[-1]'
                        break;
                    case('slight right'):
                        image = 'split-right.png';
                        break;
                }
                break;
            default: image = 'question.png';
        }

        return (image !== "") ? (
            <img
                className={`w-[30px] h-[30px] mr-4 ${className} `} 
                src={`/images/icons/directions/${image}`} 
                width="30" 
                height="30"
            />
        ) : (
            <>{maneuver.type} - {maneuver.modifier}</>
        )
    }

    const setFlyToCoordinates = (coordinates) => {
        routesProps.setRoutes((prevRoutes) => ({ 
            ...prevRoutes, 
            flyTo: coordinates, 
        }));
    }

    return (
        <div className="h-[180px] flex flex-row items-center p-2 border-2 border-solid rounded-lg mb-2">
            <div className="">
                {getManeuverIcon(step.maneuver)}
            </div>
            <div className="flex flex-col w-full cursor-pointer">
                <div
                    className="pb-4" 
                    onClick={()=>(setFlyToCoordinates(step.maneuver.location))} >
                    {step.maneuver.instruction}
                </div>
                <div>
                    <DistanceTime 
                        distance={step.distance}
                        duration={step.duration}
                    />
                </div>
            </div>
        </div>
    );
}