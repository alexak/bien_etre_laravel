

import CommerceMap from "@/Components/2_molecule/commerces/CommerceMap"
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import { useState } from "react";
import { isMobile } from 'react-device-detect';
import OpeningHours from "../OpeningHours";
import Address from "@/Components/1_atom/Address";



export default function Location({ 
    commerce,
    ...rest
}){


    const [commerces, setCommerces] = useState({
        commerces: [commerce],
        filter: {
            category: commerce.main_category.slug
        },
        sort: null
    });
    const commercesProps = {
        data: commerces,
        setCommerces: setCommerces,
    };    
    const routesProps = {
        data: null,
        setRoutes: null
    }
    const [mapconfig, setMapconfig] = useState({
        flyTo: [], // coordinates for a smoth flying to animation
        center: {
            longitude: commerce.address.coordinates.longitude - 0.005,
            latitude: commerce.address.coordinates.latitude
        },
        zoom: 15,
        style: "mapbox://styles/alexak/clwvdit8x00rn01pocvjof745"
        
    }); 
    const mapConfigProps = {
        data: mapconfig,
        setMapconfig: setMapconfig
    };
    
    return (
        <>
            <div className={`w-fill ${rest.className}`}>
                <div className="w-full pb-4 text-2xl uppercase">
                    <h2>Nous contacter</h2>
                </div>
                <div className="relative">
                    <CommerceMap 
                        commercesProps={commercesProps}
                        routesProps={routesProps}
                        mapconfigProps={mapConfigProps}
                        className="h-[600px] w-full"
                    />
                    <Card className="absolute mt-6 text-sm text-gray-700 w-96 left-20 top-3">
                        <CardBody>
                            <div className="flex flex-col w-full pb-4 uppercase">
                                <OpeningHours 
                                    openingHours={commerce.formatted_opening_hours}
                                    className="pb-6"
                                    />
                                <Address 
                                    commerce={commerce} 
                                    className="pb-6"
                                />

                                <div className="flex flex-col">
                                    <div className="pb-4 font-bold uppercase">
                                        <h2>Contact</h2>
                                    </div>
                                    <div className="flex fle-row">
                                        <div className="w-1/2">    
                                            {isMobile ? (
                                                <a href={`tel:${commerce.contact.phone}`}>{commerce.contact.phone}</a>
                                            ) : (
                                                <span>{commerce.contact.phone}</span>
                                            )}
                                        </div>
                                        <div className="w-1/2"></div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    )
}