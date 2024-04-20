

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { Progress } from "@material-tailwind/react";

export default function RatingProgressLine({
    stars,
    value,
    link,
}) {

    return (
        <div className="flex flex-row items-center">
            <span className="w-[20px]">{stars}</span>
            <FontAwesomeIcon 
                icon={faStarSolid} 
                className="w-4 h-4 pr-4 text-amber-400" 
            />
            <div className="flex-grow pr-4">
                <Progress
                    className="bg-gray-100" 
                    color="amber"
                    value={value} 
                    size="lg"
                />
            </div>
            <span className="pr-2">({value} avis)</span>
        </div>
    )

}