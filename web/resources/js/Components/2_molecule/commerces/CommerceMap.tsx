
import React, { useEffect, useRef, useState } from 'react';
import { Link, usePage } from "@inertiajs/react";
import CommerceList from './CommerceList';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function CommerceMap({commerces}){

    const { props } = usePage();
    const initialLong = props.location ? props.location.longitude : 7.72;
    const initialLat = props.location ? props.location.latitude : 48.5;

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(initialLong);
    const [lat, setLat] = useState(initialLat);
    const [zoom, setZoom] = useState(10);

    mapboxgl.accessToken = props.mapbox;

    const createCustomMarker = () => {
        const markerDiv = document.createElement('div');
        markerDiv.className = "marker";
        markerDiv.innerHTML = `<img src="/images/icons/location.png" class="h-[30px] w-[30px]"/>`;
        return markerDiv;
    };
        
    function formatGeoData(commerces) {
        const formattedData = commerces.map(commerce => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
                commerce.location.coordinates[0],
                commerce.location.coordinates[1] 
            ],
          },
          properties: {
            id: commerce.id,
            name: commerce.name,
            // Add other relevant properties for your GeoJSON
          },
        }));
      
        return {
            "type": "FeatureCollection",
            "features": formattedData
        };
    }

    useEffect(() => {
        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });        

        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        console.log(formatGeoData(commerces));

        map.current.on('load', () => {
            map.current.addControl(new mapboxgl.NavigationControl());

            map.current.addSource('commerces', {
                'type': 'geojson',
                'data': formatGeoData(commerces),
                'cluster': true,
                'clusterMaxZoom': 14, // Max zoom to cluster points on
                'clusterRadius': 50 // Radius of each cluster when clustering points (defaults to 50)    
              }
            );

            map.current.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'commerces',
                filter: ['has', 'point_count'],
                paint: {
                    // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
                    // with three steps to implement three types of circles:
                    //   * Blue, 20px circles when point count is less than 100
                    //   * Yellow, 30px circles when point count is between 100 and 750
                    //   * Pink, 40px circles when point count is greater than or equal to 750
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#ec4899',
                        100,
                        '#aa386f',
                        750,
                        '#842352'
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20,
                        100,
                        30,
                        750,
                        40
                    ]
                }
            });

            map.current.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'commerces',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': ['get', 'point_count_abbreviated'],
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12,
                },
                paint: {
                    'text-color': '#fff', 
                }
            });

            map.current.loadImage('/images/icons/location.png', (error, image) => {
                if (error) throw error;
                // Add the image to the map using a unique name, e.g., 'custom-icon'
                map.current.addImage('custom-icon', image);
                // Now you can reference 'custom-icon' in your layer configuration
            });

            map.current.addLayer({
                id: 'unclustered-point',
                type: 'symbol',
                source: 'commerces',
                filter: ['!', ['has', 'point_count']],
                layout: {
                    // Use the custom icon for each unclustered point
                    'icon-image': 'custom-icon',
                    'icon-size': 0.08
                }
            });

            map.current.on('click', 'clusters', (e) => {
                const features = map.current.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                });
                const clusterId = features[0].properties.cluster_id;
                map.current.getSource('commerces').getClusterExpansionZoom(
                    clusterId,
                    (err, zoom) => {
                        if (err) return;
    
                        map.current.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    }
                );
            });
    
            map.current.on('mouseenter', 'clusters', () => {
                map.current.getCanvas().style.cursor = 'pointer';
            });

            map.current.on('mouseleave', 'clusters', () => {
                map.current.getCanvas().style.cursor = '';
            });
    
    
      
            new mapboxgl.Marker()
                .setLngLat([lng,lat])
                .addTo(map.current);

        });
    });


    const flyToStore = (commerce) => {
        if (!map.current) return;
        map.current.flyTo({
          center: commerce.location.coordinates,
          zoom: 17
        });
    }
      
    return (
        <div className="relative flex flex-row w-full min-h-screen">
            <div className="relative w-2/3 h-screen rounded-lg">
                <div ref={mapContainer} className='w-full h-screen'/>
                <div className="absolute p-2 text-sm text-white top-2 left-2 bg-slate-600/70">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
            </div>
            <div className="w-1/3">
                <div className='relative h-screen pt-16 overflow-y-auto'>
                    <h1 className="absolute top-0 left-0 z-10 p-2 m-2 text-xl uppercase font-bolder">
                        Vos commerces proche de vous:
                    </h1>
                    {commerces.map((commerce) => (
                        <CommerceList 
                            key={commerce.id} 
                            commerce={commerce}
                            onClick={()=>flyToStore(commerce)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
