

// import isMobile from 'react-device-detect';

export default function Commerce() {
    return (
        <div>
            <div className="flex flex-row">
                <div classname="w-1/3"> Foto goes here .. / Slider</div>
                <div className="flex flex-col">
                    Category
                    Name
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
        </div>
    );
}