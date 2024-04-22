

// import isMobile from 'react-device-detect';

import React from 'react'
import ReactDOM from 'react-dom'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import ImagesSlider from "@/Components/1_atom/ImagesSlider";
import Rating from "@/Components/1_atom/Rating";
import { Link } from "@inertiajs/react";
import { Carousel } from "@material-tailwind/react";
import Reviews from '@/Components/4_organism/Reviews';


export default function Commerce({commerce, ratings}) {

    return (
        <div className="p-20">
            <div className="flex flex-row w-full pb-6">
                <div className="flex flex-col w-1/2">
                    <div className="w-full">
                        <ImagesSlider images={commerce.images} />
                    </div>
                    <div>Slider preview</div>
                </div>
                <div className="flex flex-col pt-40">
                    <div className="pb-2">
                        <Link
                            href={route('category', commerce.main_category.slug)} 
                            className="font-medium text-gray-500 uppercase hover:text-gray-700"
                        >
                            {commerce.main_category.title}
                        </Link>
                    </div>
                    <div className="text-5xl font-bold">
                        <h1>{commerce.name}</h1>
                    </div>
                    <div>
                        <AnchorLink
                            className="text-gray-500 uppercase pointer hover:text-gray-700" 
                            href="#reviews"
                        >
                            <Rating 
                                readonly
                                value={ratings.totalAvg}
                                count={ratings.totalCount}
                            />
                        </AnchorLink>
                    </div>
                </div>
            </div>


            <div>        
                maincontent including
                <ul>
                    <li>description</li>
                    <li>services (including price list)</li>
                    <li>address</li>
                    <li>map</li>
                    <li>direction</li>
                    <li>
                        if mobile: link to google map / google map navigation:
                        {/*
                            <a href={`https://www.google.com/maps/dir/?api=1&destination=${commerce.latitude},${commerce.longitude}&travelmode=driving`} target="_blank" rel="noopener noreferrer"></a>
                        */}
                    </li>
                    <li>
                        clickable telephone number: 
                        {/* <a href={`tel:${commerceNumber}`}>Call Us</a> */} 
                    </li>
                    <li>contact form (own component)</li>
                    <li>reviews: (own component)</li>
                    <li>
                        <ul>
                            <li>reviews</li>
                            <li>new review</li>
                        </ul>
                    </li>
                    <li>payment ?</li>
                    <li>button reserver</li>
                </ul>
                
            </div>


            <div>
                <section id="reviews">
                    <Reviews 
                        commerce={commerce}
                        ratings={ratings}
                    />
                </section>
            </div>


        </div>
    );
}