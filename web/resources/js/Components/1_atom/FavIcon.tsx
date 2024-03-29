
import { faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '@material-tailwind/react/components/Tooltip';
import { useState } from 'react';
import Inertia from '@inertiajs/core';
import { router } from '@inertiajs/react'

export default function FavIcon({ commerce, ...props } ) {

    const favIcon = commerce.isFavorite ? faHeartSolid : faHeartRegular;
    const [displayedFavIcon, setDisplayedFavIcon] = useState(favIcon);
    const [currentCommerce, setCurrentCommerce] = useState(commerce);

    const toggleFavorite = () => {
        if(currentCommerce.isFavorite) {
            router.visit(route('favorites.delete', currentCommerce.id), {
                method: 'delete',
                preserveScroll: true,
                onSuccess: () => { setCurrentCommerce({ ...currentCommerce, isFavorite: !currentCommerce.isFavorite }) }
            })
        } else {
            router.visit(route('favorites.add'), {
                method: 'post',
                data: {commerceId: currentCommerce.id},
                preserveScroll: true,
                onFinish: () => { setCurrentCommerce({ ...currentCommerce, isFavorite: !currentCommerce.isFavorite }) }
            })
        }
    } 

    return (
        <div
            onClick={()=>toggleFavorite()} 
            onMouseEnter={()=>setDisplayedFavIcon(faHeartSolid)} 
            onMouseLeave={()=>setDisplayedFavIcon(favIcon)}
            {...props}
        >
            <FontAwesomeIcon 
                className={`h-4 w-4 ${currentCommerce.isFavorite ? 'text-pink-500' :  'text-gray-800' } `} 
                icon={displayedFavIcon}
            />
        </div>
    );
}

