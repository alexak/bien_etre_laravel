import { faArrowsLeftRight, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@material-tailwind/react";


export default function DistanceTime({distance, duration}) {

    const secondesToTimeStr = (seconds) => {

        if (seconds < 0 || isNaN(seconds)) {
            return null;
        }
        const date = new Date(seconds * 1000);
        
        var timeString = "";
        const hours = date.getUTCHours();
        timeString = (hours === 0) ? "" : "1 heure";
        timeString = (1<hours) ? `${hours} heures`: timeString ;
        
        const minutes = date.getUTCMinutes();
        if(0<minutes) {
            timeString = (minutes == 1) ? `${timeString} ${minutes} minute` : `${timeString} ${minutes} minutes`; 
        }
        
        const utcSeconds = date.getUTCSeconds();
        if((hours==0) && (minutes==0)) {
            timeString = (0==utcSeconds) ? 'Vous êtes arrivé(e)' : `${utcSeconds} secondes`;
        }

        return timeString;
    }

    const getDistance = (distance) => {
        return (1000<distance) ? `${(distance/1000).toFixed(1)} km` : `${distance.toFixed(0)} m`;
    }


    return (
        <div className="flex flex-row">
            { 0<distance ? (
                    <div className="pr-2">
                        <Tooltip 
                            className="text-gray-800 bg-white border-2 border-solid drop-shadow-lg"
                            content="Distance par rapport votre position"
                            placement="bottom-start"
                        >
                            <div className="flex flex-row items-center h-6 pr-2 border-r-2 border-gray-400">
                                <FontAwesomeIcon 
                                    className="pr-2 text-gray-400"
                                    icon={faArrowsLeftRight}
                                    size="sm"
                                />
                                <span className="font-semibold">{getDistance(distance)}</span>
                            </div>
                        </Tooltip>
                    </div> 
                ) :(
                    <></>
                )
            }
            <div className="">
                <Tooltip 
                    className="text-gray-800 bg-white border-2 border-solid drop-shadow-lg"
                    content="Distance par rapport votre position"
                    placement="bottom-start"
                >
                    <div className="flex flex-row items-center h-6">
                        <FontAwesomeIcon 
                            className="pr-2 text-gray-400"
                            icon={faClock}
                            size="sm"
                        />
                        <span className="font-semibold">{secondesToTimeStr(duration)}</span>
                    </div>
                </Tooltip>
            </div>
        </div>
    );
}