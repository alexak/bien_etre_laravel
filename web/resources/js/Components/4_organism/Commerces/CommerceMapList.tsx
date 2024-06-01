
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

    const [mapconfig, setMapconfig] = useState({
        flyTo: [], // coordinates for a smoth flying to animation
        center: {
            longitude: props.location && props.location.longitude ? props.location.longitude : 7.72,
            latitude: props.location && props.location.latitude ? props.location.latitude : 48.5
        }
    });
    const mapConfigProps = {
        data: mapconfig,
        setMapconfig: setMapconfig
    };


    return (
        <div className="flex flex-col w-full min-h-screen overflow-y-auto md:flex-row">
            <div className="relative flex-grow">
                <CommerceMap 
                    commercesProps={commercesProps}
                    routesProps={routesProps}
                    mapconfigProps={mapConfigProps}
                    className="rounded-lg w-full h-[400px] md:h-screen"
                />
            </div>
            <div className="w-full md:w-1/3">
                {routes.alternatives.length > 0 ? (
                   <RoutesDirections routesProps={routesProps} />
                ):(
                    commercesProps.data.commerces?.length > 0 ? (
                        <CommercesList 
                            commercesProps={commercesProps}
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
