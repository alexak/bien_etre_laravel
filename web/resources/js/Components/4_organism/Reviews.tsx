
import { useState } from "react"

import { Button } from "@material-tailwind/react"
import NewReviewForm from "@/Components/3_cell/reviews/NewReviewForm"
import ReviewSummary from "@/Components/3_cell/reviews/ReviewSummary"
import ReviewSummaryEmpty from "@/Components/3_cell/reviews/ReviewSummaryEmpty";
import ReviewLine from "@/Components/2_molecule/reviews/ReviewLine";
import SortReview from "@/Components/1_atom/SortReview";

export default function Reviews({
    commerce,
    reviews,
    ratings
}) {

    const [display, setDisplay] = useState('summary');
    const [pageReviews, setPageReviews] = useState(reviews);

    return (
        <div className="flex flex-col">

            <div className="flex flex-row items-center justify-between w-full py-4">
                <div className="text-2xl uppercase">
                    <h2>L'avis des clients</h2>
                </div>
                <Button
                    onClick={()=>{setDisplay('new')}} 
                    className="w-[200px] h-[40px] text-white cursor-pointer bg-pink-500 rounded-lg flex justify-center items-center uppercase">
                    Donner son avis
                </Button>
            </div>

            { display == 'new' ? (
                    <NewReviewForm 
                        commerce={commerce}
                        parentSetDisplay={setDisplay}
                    />
                ):( ratings.totalCount == 0 ? (
                        <ReviewSummaryEmpty parentSetDisplay={setDisplay} />
                    ):( 
                        <ReviewSummary ratings={ratings} />
                    )
                )
            }

            <div className="mb-6 border-b-2">
                <SortReview
                    commerce={commerce}
                    onSortChange={setPageReviews}
                />
            </div>

            {pageReviews.map((review) => (
                <ReviewLine key={review.id} review={review} />
            ))}

        </div>
    )
}
