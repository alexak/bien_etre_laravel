
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rating as MaterialRating } from "@material-tailwind/react";

export default function Rating({
    count = null,
    setData = () => {}, 
    name = '',
    ...props
}) {
    
    function RatedIcon() {
        return (
            <FontAwesomeIcon 
                icon={faStarSolid} 
                className={`w-4 h-4 pr-2 ${(props.value || !props.readonly) ? 'text-amber-400' : 'text-gray-400'}`} 
            />
        );
    }
    
    function UnratedIcon() {
        return (
            <FontAwesomeIcon 
            icon={faStarRegular} 
            className="w-4 h-4 pr-2 text-gray-400" 
        />
        );
    }

    return (
        <div className="flex flex-row">
            <MaterialRating
                {...props} 
                value={props.value ? Math.round(props.value) : 5}
                ratedIcon={<RatedIcon />}
                unratedIcon={<UnratedIcon />}
                onChange={(value) => setData({ ...props, [name]: value })}
            />
                {props.value ? (
                    <span className="">
                        {props.value} sur 5 {count ? `(${count} avis)` : ''}
                    </span>
            ):(
                props.readonly ? (
                    <span>Pas d'avis</span>
                ) : (
                    <></>
                )
            )}
        </div>
    );
}