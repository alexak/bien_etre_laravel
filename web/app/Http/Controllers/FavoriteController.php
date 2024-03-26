<?php

namespace App\Http\Controllers;

use App\Models\Commerce;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('Favorites', [
            'favoritedCommerces' => $user->favorites->with('commerce')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addFavoriteToUser(Request $request)
    {
        $user = Auth::user();

        //@todo: test if favorite is already set..

        $user->favorites->attach($request->post());




        /*
        $commerceId = $request->input('commerce_id');

        // Validate request data (e.g., commerce_id is required)
        $request->validate([
            'commerce_id' => 'required|integer|exists:commerces,id',
        ]);

        // Check if commerce is already a favorite to avoid duplicates
        if ($user->favorites()->where('commerces_id', $commerceId)->exists()) {
            return response()->json(['message' => 'Commerce already favorited'], 422);
        }

        // Attach the commerce to the user's favorites
        $user->favorites()->attach($commerceId);
        */

        return response()->json(['message' => 'Commerce added to favorites']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function deleteFavoriteFromUser(Request $request)
    {
        $user = Auth::user();
        $user->favorites->detach($request->delete());



        /*
        $user = Auth::user();
        $commerceId = $request->input('commerce_id');

        // Validate request data (e.g., commerce_id is required)
        $request->validate([
            'commerce_id' => 'required|integer|exists:commerces,id',
        ]);

        // Detach the commerce from the user's favorites
        $user->favorites()->detach($commerceId);

        return response()->json(['message' => 'Commerce removed from favorites']);
        */
    }
}
