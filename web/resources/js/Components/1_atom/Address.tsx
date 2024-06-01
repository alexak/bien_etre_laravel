



export default function Address({
    commerce,
    ...rest
}){
    return (
        <div className={`flex flex-col text-sm text-gray-700 ${rest.className}`}>
            <div className="pb-4 font-bold uppercase">
                <h2>Addresse</h2>
            </div>
            <div className="min-h-6">
                { commerce.address.address_1 }
            </div>
            <div className="min-h-6">
                { commerce.address.address_2 }
            </div>
            <div className="flex flex-row pb-4 font-semibold">
                <div className="pr-6">
                    { commerce.address.postal_code }
                </div>
                <div>
                    { commerce.address.city }
                </div>
            </div>
            <div className="flex flex-row">
                <div className="w-1/2">
                <a href={`https://www.google.com/maps?q=${commerce.address.coordinates.latitude},${commerce.address.coordinates.longitude}`} 
                        target="_blank"
                        className="flex flex-row pb-3"
                    >
                        <img
                            className="w-[20px] h-[20px] mr-3" 
                            src="/images/icons/google_maps.png" 
                            alt="" 
                            width="20" 
                            height="20"
                        />
                        <div className="text-xs font-medium text-gray-500 uppercase hover:text-gray-700">
                            Google maps
                        </div>
                    </a>
                </div>
                <div className="w-1/2">
                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${commerce.address.coordinates.latitude},${commerce.address.coordinates.longitude}`} 
                        target="_blank"
                        className="flex flex-row"
                    >
                        <img
                            className="w-[20px] h-[20px] mr-3" 
                            src="/images/icons/destination.png" 
                            alt="" 
                            width="20" 
                            height="20"
                        />
                        <div className="text-xs font-medium text-gray-500 uppercase hover:text-gray-700">
                            Direction
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}