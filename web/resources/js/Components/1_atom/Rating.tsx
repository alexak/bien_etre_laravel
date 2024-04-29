
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rating as MaterialRating } from "@material-tailwind/react";

export default function Rating({
    count = null,
    setData = (name, value) => {}, 
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
        <div className="flex flex-row justify-between">
            <div>

            <MaterialRating
                {...props} 
                value={props.value ? Math.round(props.value) : 5}
                ratedIcon={<RatedIcon />}
                unratedIcon={<UnratedIcon />}
                onChange={(value) => setData(name, value)}
                className={`${props.readonly? 'max-[450px]:hidden' : ''}`}
                />
            </div>
                {props.value ? (
                    <div className={`${count? 'w-[200px]' : 'w-[75px]'} flex justify-end`}>
                        {props.value} sur 5 {count ? `(${count} avis)` : ''}
                    </div>
            ):(
                props.readonly ? (
                    <div className='w-[75px] flex justify-end'>
                        Pas d'avis
                    </div>
                ) : (
                    <></>
                )
            )}
        </div>
    );
}