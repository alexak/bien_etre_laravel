

import RatingCounts from "@/Components/2_molecule/reviews/RatingCounts"
import ReviewDetails from "@/Components/2_molecule/reviews/ReviewDetails"
import ReviewSlider from "@/Components/2_molecule/reviews/ReviewSlider"
import Rating from "@/Components/1_atom/Rating";
import { Card, CardBody } from "@material-tailwind/react"


export default function ReviewSummary({ratings}){

    return(
        <Card className="w-full mb-6 border border-gray-200">
            <CardBody>
                <div className="flex flex-row w-full pb-6">
                    {/** Quotes */}
                    <div className="flex flex-col w-1/3 h-full mr-4">
                        <RatingCounts ratings={ratings} />
                    </div>

                    {/* Slider with most upvoded and latest */}
                    <div className="flex flex-col w-1/3 h-full mr-4">
                        <ReviewSlider />
                    </div>

                    {/** Ratingdetails */}
                    <div className="w-1/3 h-full">
                        <ReviewDetails 
                            readonly={true}
                            ratings={ratings}
                        />
                    </div>
                </div>

                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center uppercase">
                        <span className="pr-2 font-semibold">
                            Note globale:
                        </span>
                            <Rating 
                                readonly
                                value={ratings.totalAvg}
                                count={ratings.totalCount}
                            />
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}