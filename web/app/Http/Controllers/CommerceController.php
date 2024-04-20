<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Commerce;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommerceController extends Controller
{
    /**
     * function that renders the commerce detail page
     *
     * @param [type] $slug
     * @return void
     */
    public function index($slug){

        $commerce = Commerce::with('mainCategory')
            ->with('images')
            ->with('reviews')
            ->where('slug', $slug)
            ->first();
                  
        if (!$commerce) {
            return Inertia::share('error', [
                'status' => '404',
                'message' => 'Ressource not found'
            ]);
        }

        $userFavorites = Auth::check() ? Auth::user()->favoriteCommerceIds->pluck('favorite_commerce_id', 'favorite_commerce_id')->toArray() : [];
        $commerce->isFavorite = isset($userFavorites[$commerce->id]) ? true : false;

        $ratings=[
            'totalAvg' => $this->getRatingAvg($commerce->id),
            'totalCount' => count($commerce->reviews),
            'detailedAvg' => $this->getRatingDetailedAvg($commerce->id),
            'countsByRatings' => $this->getRatingsCount($commerce->id),
        ];

        return Inertia::render('Commerce', [
            'commerce' => $commerce,
            'ratings' => $ratings
        ]);
    }


    private function getRatingDetailedAvg($id) {
        $ratingDetailedAvgCollection = DB::table('reviews')
            ->where('commerce_id', $id)
            ->select(DB::raw('avg(rating_price) as avg_price_rating'),
                DB::raw('avg(rating_professionalism) as avg_professionalism_rating'),
                DB::raw('avg(rating_cleanliness) as avg_cleanliness_rating'),
                DB::raw('avg(rating_kindness) as avg_kindness_rating'),
                DB::raw('avg(rating_quality) as avg_quality_rating'))
            ->first();

        $ratingDetailedAvg = [];
        foreach((array)$ratingDetailedAvgCollection as $key => $value) {
            $ratingDetailedAvg[$key] = round(floatval($value), 1);
        }

        return $ratingDetailedAvg;
    }

    private function getRatingsCount($id){
        $ratingCountsCollection = DB::table('reviews')
            ->select(DB::raw('rating,count(rating) as count'))
            ->where('commerce_id', $id)
            ->orderBy('rating')
            ->groupBy('rating')
            ->get();

        $countsTmp = $ratingCountsCollection->mapWithKeys(function ($item) {
                return [$item->rating => $item->count];
            })->toArray();

        $counts = [];
        for($i=0; $i<6; $i++) {
            $counts[$i] = [
                'key'=>$i,
                'value'=>$countsTmp[$i] ?? 0
            ];
        }

        return $counts;
    }

    private function getRatingAvg($id) {
        $ratingTotalAvg = DB::table('reviews')
            ->select(DB::raw('avg(rating) as rating_total_avg'))
            ->where('commerce_id', $id)
            ->first();

        return round((float)$ratingTotalAvg->rating_total_avg);
    }


    /**
     * function that renders the edit form in order to create a new commerce or edit an existing one
     *
     * @return void
     */
    public function commerceEdit() {
    }

    /**
     * Function that saves the modfified commerce from the form
     *
     * @return void
     */
    public function commerceSave() {
    }

    /**
     * Function that contacts the main contact of the commerce
     *
     * @return void
     */
    public function commerceContact(){}

    /**
     * Function that creates a new review for the commerce
     *
     * @return void
     */
    public function addReview(){
    }
}