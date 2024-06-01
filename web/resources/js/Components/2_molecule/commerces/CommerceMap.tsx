import React, { useEffect, useRef, useState } from 'react';
import { router, usePage } from "@inertiajs/react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import CommerceCardSmall from '@/Components/2_molecule/commerces/CommerceCardSmall';

export default function CommerceMap({
    commercesProps,
    routesProps,
    mapconfigProps,
    ...rest
}) {
    const { props } = usePage();
    const { data:routes, setRoutes } = routesProps;
    const { data:mapconfig, setMapconfig } = mapconfigProps;
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(mapconfigProps.data.zoom ?? 10);

    const setAttribute = (attribute, value) => {
        setRoutes((prevRoutes) => ({
            ...prevRoutes,
            [attribute]: value,
        }));
    };

    const formatGeoData = (commerces) => {
        const formattedData = commerces.map(commerce => ({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [
                    commerce.coordinates.longitude,
                    commerce.coordinates.latitude
                ],
            },
            properties: {
                id: commerce.id,
                name: commerce.name,
                commerce: commerce
            },
        }));

        return {
            type: 'FeatureCollection',
            features: formattedData
        };
    };    
    
    const getCommercesOnVisibleMap = () => {
        if (!map.current) return;

        let filter = commercesProps.data.filter;
        filter.bounds = map.current.getBounds();
        commercesProps.setCommerces((prev) => ({
            ...prev,
            filter: filter
        }));
    };



    useEffect(() => {
        if (map.current) return; // Initialize map only once
  
        mapboxgl.accessToken = props.mapbox;
        console.log('map init');
        
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: mapconfigProps.data.style ?? 'mapbox://styles/mapbox/streets-v12',
            center: [mapconfig.center.longitude, mapconfig.center.latitude],
            zoom: zoom,
            cooperativeGestures: true
        });

        map.current.on('move', () => {
            setZoom(map.current.getZoom().toFixed(2));
            getCommercesOnVisibleMap();
        });

        map.current.on('load', () => {
            map.current.addControl(new mapboxgl.NavigationControl());
            map.current.addControl(new mapboxgl.ScaleControl());
            //if (commerces.length !== 1) {
                getCommercesOnVisibleMap();
            //}
            map.current.addSource('commerces', {
                type: 'geojson',
                data: formatGeoData(commercesProps.data.commerces),
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50
            });

            map.current.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'commerces',
                filter: ['has', 'point_count'],
                paint: {
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
                map.current.addImage('custom-icon', image);
            });

            map.current.addLayer({
                id: 'unclustered-point',
                type: 'symbol',
                source: 'commerces',
                filter: ['!', ['has', 'point_count']],
                layout: {
                    'icon-image': 'custom-icon',
                    'icon-size': 0.08
                }
            });

            map.current.resize();

            map.current.on('click', 'unclustered-point', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const name = e.features[0].properties.name;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                const tooltipRendered = <CommerceCardSmall commerce={JSON.parse(e.features[0].properties.commerce)} />;
                const html = ReactDOMServer.renderToString(tooltipRendered);
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

            if (props.location && map.current) {
                new mapboxgl.Marker(getHtmlMarker('bg-sky-400'))
                    .setLngLat({
                        lat: props.location.latitude,
                        lng: props.location.longitude
                    })
                    .addTo(map.current);
            }
        });

        map.current.on('styledata', () => {
            if (routes && routes.alternatives && routes.alternatives.length > 0) {
                const geojson = {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: routes.alternatives[routes.activeRouteId].geometry.coordinates
                    }
                };

                if (map.current.getSource('route')) {
                    map.current.getSource('route').setData(geojson);
                    map.current.setLayoutProperty('route', 'visibility', 'visible');
                } else {
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
            }
        });
    }, []);


    useEffect(() => {
        if (map.current) {
            const geojson = formatGeoData(commercesProps.data.commerces);
            const source = map.current.getSource('commerces');
            if (source) {
                source.setData(geojson);
            }
        }
    }, [commercesProps.data.commerces]);


    useEffect(() => {
        if (!map.current || mapconfig.flyTo.length === 0) return;

        map.current.flyTo({
            center: mapconfig.flyTo,
            zoom: 17
        });
        setMapconfig((prev) => ({
            ...prev,
            flyTo: [],
        }));
    }, [mapconfig.flyTo]);

    if (routes) {
        useEffect(() => {
            if (!routes.trip.destination) return;

            const url = `https://api.mapbox.com/directions/v5/mapbox/${routes.trip.mode}/${routes.trip.origin.longitude},${routes.trip.origin.latitude};${routes.trip.destination.longitude},${routes.trip.destination.latitude}`;
            const params = {
                overview: 'full',
                steps: true,
                geometries: 'geojson',
                access_token: mapboxgl.accessToken,
                alternatives: true,
                language: 'fr',
                annotations: 'distance,duration'
            };

            axios.get(url, { params })
                .then(response => {
                    if (response.data.routes.length === 0) return;
                    setAttribute('alternatives', response.data.routes);
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                });
        }, [routes.trip]);

        useEffect(() => {
            if (!routes.alternatives || routes.alternatives.length === 0) {
                if (map.current.getLayer('route')) {
                    map.current.setLayoutProperty('route', 'visibility', 'none');
                }
                return;
            }

            const geojson = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: routes.alternatives[routes.activeRouteId].geometry.coordinates
                }
            };

            if (map.current.getSource('route')) {
                map.current.getSource('route').setData(geojson);
                map.current.setLayoutProperty('route', 'visibility', 'visible');
            } else {
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
        }, [routes.alternatives, routes.activeRouteId]);
    }

    const getHtmlMarker = (color) => {
        const markerContainer = document.createElement('div');
        markerContainer.className = 'absolute top-0 left-0 ';

        const el = document.createElement('div');
        el.className = `w-4 h-4 animate-ping ${color} rounded-full absolute top-0 left-0`;
        el.style.transformOrigin = 'center';
        markerContainer.appendChild(el);

        const elfixed = document.createElement('div');
        elfixed.className = `w-4 h-4 ${color} rounded-full absolute top-0 left-0`;
        markerContainer.appendChild(elfixed);

        return markerContainer;
    };

    const zoomOut = () => {
        if (zoom > 5) {
            map.current.setZoom(zoom - 1);
        }
    };

    return (
        <div className={`relative ${rest.className}`}>
            <div ref={mapContainer} 
                className="w-full h-full"/>
            <div className="absolute p-2 text-sm text-white top-2 left-2 bg-slate-600/70">
                Longitude: {mapconfig.center.longitude} | Latitude: {mapconfig.center.latitude} | Zoom: {zoom}
            </div>
        </div>
    );
}
