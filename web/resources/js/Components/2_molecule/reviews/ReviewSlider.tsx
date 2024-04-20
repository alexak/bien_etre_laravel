
import { Carousel } from "@material-tailwind/react";


export default function ReviewSlider() {
    return(
        <Carousel className="w-full h-full">
            <div className="w-full h-full">
                <div className="w-full mb-2 font-semibold border-b-2">
                    L'avis plus utile:
                </div>
                <div className="h-[130px]">
                </div>
            </div>
            <div className="w-full h-full">
                <div className="w-full mb-2 font-semibold border-b-2">
                    Le denier avis:
                </div>
                <div className="h-[130px]">
                </div>
            </div>
        </Carousel>
    )
}