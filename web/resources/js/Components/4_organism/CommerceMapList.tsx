
import React, { useEffect, useState } from 'react';
import { usePage } from "@inertiajs/react";
import 'mapbox-gl/dist/mapbox-gl.css';
import EmptyResults from '@/Components/1_atom/EmptyResults';
import CommerceMap from '@/Components/2_molecule/commerces/CommerceMap';
import RoutesDirections from '@/Components/3_cell/Commerces/RoutesDirections';
import CommercesList from '@/Components/3_cell/Commerces/CommercesList';


export default function CommerceMapList({ commercesProps }){

    const { props } = usePage();
    const [routes, setRoutes] = useState({
        alternatives: [], // routes definitions
        activeRouteId: 0, // if of the active route if there are multiple possibilities
        trip: { // main route with start point and destination
            mode: 'driving',
            origin: props.location,
            destination: null
        }
    });
    const routesProps = {
        data: routes,
        setRoutes: setRoutes
    };

    const [commerces, setCommerces] = useState(commercesProps.data);
    useEffect(() => {
        commercesProps.setCommerces(commerces);
    },[commerces])
    
    const childCommerceProps = {
        data: commerces,
        setCommerces: setCommerces
    };

    const [mapconfig, setMapconfig] = useState({
        flyTo: [], // coordinates for a smoth flying to animation
        center: {
            longitude: props.location.longitude ? 7.72,
            latitude: props.location.latitude ? 48.5
        }
    });
    
    const mapConfigProps = {
        data: mapconfig,
        setMapconfig: setMapconfig
    };


    return (
        <div className="flex flex-col w-full min-h-screen overflow-y-auto md:flex-row">
            <div className="relative w-full rounded-lg md:w-2/3">
´               <CommerceMap 
                    commercesProps={childCommerceProps}
                    routesProps={routesProps}
                    mapconfigProps={mapConfigProps}
                />
            </div>
            <div className="w-full md:w-1/3">
                {routes.alternatives.length > 0 ? (
                   <RoutesDirections routesProps={routesProps} />
                ):(
                    commerces?.length > 0 ? (
                        <CommercesList 
                            commercesProps={childCommerceProps}
                            routesProps={routesProps}
                            mapconfigProps={mapConfigProps}
                        />
                    ):(
                        <EmptyResults parentZoomOut={()=>zoomOut()}/>
                    )
                )}
            </div>
        </div>
    )
}
