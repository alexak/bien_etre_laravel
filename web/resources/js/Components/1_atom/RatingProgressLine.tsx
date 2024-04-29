

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { Progress } from "@material-tailwind/react";

export default function RatingProgressLine({
    stars,
    value,
    link,
    totalCount
}) {

    return (
        <div className="flex flex-row items-center" >
            <span className="w-[20px]">{stars}</span>
            <FontAwesomeIcon 
                icon={faStarSolid} 
                className="w-4 h-4 pr-4 text-amber-400" 
            />
            <div className="flex-grow w-full pr-4">
                <Progress
                    className="w-full bg-gray-100" 
                    color="amber"
                    value={value*100/totalCount}
                    size="lg"
                />
            </div>
            <div className="w-[100px] flex flex-row justify-end">{value} avis</div>
        </div>
    )

}