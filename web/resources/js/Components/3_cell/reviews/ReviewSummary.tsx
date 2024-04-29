

import RatingCounts from "@/Components/2_molecule/reviews/RatingCounts"
import ReviewDetails from "@/Components/2_molecule/reviews/ReviewDetails"
import ReviewSlider from "@/Components/2_molecule/reviews/ReviewSlider"
import Rating from "@/Components/1_atom/Rating";
import { Card, CardBody } from "@material-tailwind/react"


export default function ReviewSummary({ratings}){

    return(
        <Card className="w-full mb-6 border border-gray-200">
            <CardBody>
                <div className="flex flex-col w-full lg:flex-row">
                    {/** Quotes */}
                    <div className="flex flex-col w-full h-full pb-6 mr-4 lg:w-1/2">
                        <RatingCounts ratings={ratings} />
                    </div>

                    {/** Ratingdetails */}
                    <div className="w-full h-full pb-6 lg:w-1/2">
                        <ReviewDetails 
                            readonly={true}
                            ratings={ratings}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-start uppercase sm:flex-row">
                    <div className="pr-2 font-semibold">
                        Note globale:
                    </div>
                    <Rating 
                        readonly
                        value={ratings.totalAvg}
                        count={ratings.totalCount}
                    />
                </div>
            </CardBody>
        </Card>
    )
}