
import { useEffect, useState } from "react"

import { Button } from "@material-tailwind/react"
import NewReviewForm from "@/Components/3_cell/reviews/NewReviewForm"
import ReviewSummary from "@/Components/3_cell/reviews/ReviewSummary"
import ReviewSummaryEmpty from "@/Components/3_cell/reviews/ReviewSummaryEmpty";
import ReviewLine from "@/Components/2_molecule/reviews/ReviewLine";
import SortReview from "@/Components/2_molecule/reviews/SortReview";
import { router } from "@inertiajs/react";
import FilterReview from "@/Components/2_molecule/reviews/FilterReview";

export default function Reviews({
    commerce,
    reviews,
    ratings
}) {

    const [display, setDisplay] = useState('summary');
    const [pageReviews, setPageReviews] = useState(reviews);
    const [sortAndFilter, setSortAndFilter] = useState({
        id: commerce.id,
        sortBy: 'created_at',
        sortDirection: 'desc',
        filter: {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true
        },
        updated:false
    })
    

    const handleFilterChange = (newFilters) => {
        setSortAndFilter(prev => ({
            ...prev,
            filter: newFilters,
            updated:true
        }));
    };

    const handleSort = (attribute, direction) => {
        setSortAndFilter(prev => ({
            ...prev,
            sortBy: attribute,
            sortDirection: direction,
            updated:true
        }));
    };

    useEffect(() => {
        if (sortAndFilter.updated){
            const url = '/commerce/' +commerce.slug +'/review';
            router.visit(url, {
                method: 'get',
                data: sortAndFilter,
                only: ['reviews'],
                replace: true,
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    setPageReviews(page.props.reviews);
                }
            })
        }
    }, [sortAndFilter]);

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

            { pageReviews.length === 0 ? (
                    <></>
                ):(
                    <>
                        <div className="flex flex-row mb-6 border-b-2">
                            <div className="mr-8">
                                <SortReview
                                    commerce={commerce}
                                    sort={handleSort}
                                />
                            </div>
                            <div>
                                <FilterReview
                                    parentFilterRates={sortAndFilter.filter}
                                    setParentFilterRates={handleFilterChange}
                                />
                            </div>
                        </div>

                        {
                            pageReviews.map((review) => (
                                <ReviewLine key={review.id} review={review} />
                            ))
                        }
                    </>
                )
            }

        </div>
    )
}
