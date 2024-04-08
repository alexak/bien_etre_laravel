
import React, { useEffect, useRef, useState } from 'react';
import { Link, usePage } from "@inertiajs/react";
import CommerceList from './CommerceList';
import CommerceCardSmall from './CommerceCardSmall';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import RoutesDirections from '@/Components/3_cell/RoutesDirections';


export default function CommerceMap({commerces}){

    const { props } = usePage();
    const [centerpoint, setCenterPoint] = useState(
        {
            long: props.location ? props.location.longitude : 7.72,
            lat: props.location ? props.location.latitude : 48.5,
        },
    );
    
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(centerpoint.long);
    const [lat, setLat] = useState(centerpoint.lat);
    const [zoom, setZoom] = useState(10);
    const [routes, setRoutes] = useState(null);
    const [activeRoute, setAvtiveRoute] = useState(0);
    const [routeFromTo, setRouteFromTo] = useState({
        mode: 'driving',
        start: props.location,
        end: null
    });

    mapboxgl.accessToken = props.mapbox;
        
    function formatGeoData(commerces) {
        const formattedData = commerces.map(commerce => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: 
            [
                commerce.coordinates.longitude,
                commerce.coordinates.latitude
            ],
          },
          properties: {
            id: commerce.id,
            name: commerce.name,
            commerce: commerce
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

            //TODO: RECALCULATE COMMERCES OF THE NEW BOUNDING BOX

        });

        map.current.on('load', () => {
            map.current.addControl(new mapboxgl.NavigationControl());
            map.current.addControl(new mapboxgl.ScaleControl());


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

            map.current.on('click', 'unclustered-point', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const name = e.features[0].properties.name
    
                // Ensure that if the map is zoomed out such that
                // multiple copies of the feature are visible, the
                // popup appears over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                const tooltipRenedered= <CommerceCardSmall commerce={JSON.parse(e.features[0].properties.commerce)} />
                const html = ReactDOMServer.renderToString(tooltipRenedered);
                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(html)
                    .addTo(map.current);
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
    
            if (props.location) {
                map.current.addLayer({
                    id: 'user-location',
                    type: 'circle',
                    source: {
                        type: 'geojson',
                        data: {    
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Point',
                                coordinates: [props.location.longitude, props.location.latitude]
                            }
                        }
                    },
                    paint: {
                        'circle-radius': 10, // Size of the circle
                        'circle-color': '#007cbf', // Blue color
                        'circle-stroke-width': 2,
                        'circle-stroke-color': '#ffffff' // White border
                    }
                });
            }

        });
    });


    const flyToStore = (commerce) => {
        if (!map.current) return;
        map.current.flyTo({
          center: commerce.location.coordinates,
          zoom: 17
        });
        const features = map.current.queryRenderedFeatures(commerce.location.coordinates, {
            layers: ['unclustered-point'] // replace with your layer name
          });
      
        console.log(features);
    }
    
    useEffect(() => {
        console.log(routeFromTo);
        if(!routeFromTo.end) return;

        const url = `https://api.mapbox.com/directions/v5/mapbox/${routeFromTo.mode}/${routeFromTo.start.longitude},${routeFromTo.start.latitude};${routeFromTo.end.longitude},${routeFromTo.end.latitude}`;
        const params = {
          overview: 'full',
          steps: true,
          geometries: 'geojson',
          access_token: mapboxgl.accessToken,
          alternatives: true,
          language: 'fr',
          annotations:'distance,duration'
          // arrive_by: YYYY-MM-DDThh:mm:ssZ // The desired arrival time, formatted in one of three ISO 8601 usagbe if driving and rdv pris.
        };
      
        axios.get(url, { params })
            .then(response => {
                if (response.data.routes.length == 0) return;
      
                setRoutes(response.data.routes);
            })
            .catch(error => {
                // Handle any errors here
                console.error('Error fetching data: ', error);
            });
    },[routeFromTo])

    useEffect(() => {
        if (!routes || routes.length == 0) return;

        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: routes[activeRoute].geometry.coordinates
            }
        };

        if (map.current.getSource('route')) {
            // if the route already exists on the map, we'll reset it using setData
            map.current.getSource('route').setData(geojson);
            map.current.setLayoutProperty('route', 'visibility', 'visible');
        } else {
            // otherwise, we'll make a new request
            map.current.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: geojson
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#ec4899',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });
        }
    }, [routes, activeRoute]);

    const unsetRoute = () => {
        setRoutes(null);
        map.current.setLayoutProperty('route', 'visibility', 'none');
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
                {routes ? (  
                    <RoutesDirections 
                        routes={routes}
                        unsetRoute={()=>unsetRoute()}
                        parentActiveRoute={activeRoute}
                        setParentActiveRoute={setAvtiveRoute}
                        parentRouteFromTo={routeFromTo}
                        setParentRouteFromTo={setRouteFromTo}
                    />
                ) : (
                    <div className='relative h-screen pt-16 overflow-y-auto'>
                        <h1 className="absolute top-0 left-0 z-10 p-2 m-2 text-xl uppercase font-bolder">
                            Vos commerces proche de vous:
                        </h1>
                        {commerces.map((commerce) => (
                            <CommerceList 
                                key={commerce.id} 
                                commerce={commerce}
                                onClickName={()=>flyToStore(commerce)}
                                onClickDirection={
                                    ()=>(setRouteFromTo((prevRoute) => ({ ...prevRoute, end:commerce.coordinates})) ) 
                                }
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
