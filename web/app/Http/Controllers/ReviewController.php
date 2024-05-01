<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /** 
     * Function that fetches the reviews related to a commerce
     */
    public function getReviews($commerceId, Request $request){
        $sortBy = $request->has('sortBy') ? $request->input('sortBy') : 'created_at';
        $sortDirection = $request->has('sortDirection') ? $request->input('sortDirection') : 'desc';

        $reviews = Review::where('commerce_id', $request->input('id'))
            ->orderBy($sortBy, $sortDirection)
            ->get();

        return Inertia::render('Commerce', [
            'reviews' => $reviews,
        ]);
    }
    
    
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

        return redirect()->back()->with('success', 'Review added successfully');
    }

    public function upVote(){
    }
}
