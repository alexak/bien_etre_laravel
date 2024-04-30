<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Function that creates a new review for the commerce
     *
     * @return void
     */
    public function addReview(Request $request){

        $review = Review::create([
            'rating' => $request->rating,
            'comment' => $request->comment,
            'commerce_id' => $request->commerceId,
            'rating_price' => $request->priceRating, 
            'rating_professionalism' => $request->professionalismRating,
            'rating_cleanliness' => $request->cleanlinessRating,
            'rating_kindness' => $request->kindnessRating,
            'rating_quality' => $request->qualityRating,
            'user_id' => Auth::user()->id,
            'upvoting' => 0
        ]);
        $review->save();

        $commerce = $review->commerce; 

        $ratings = [
            'totalAvg' => $commerce->average_rating,
            'totalCount' => $commerce->reviews->count(),
            'detailedAvg' => $commerce->getDetailedAverageRatings(),
            'countsByRatings' => $commerce->getRatingsCount(),
        ];

        return redirect()->back()->with('success', 'Review added successfully');
    }

    public function upVote(){
    }
}
