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
        if (!$user) {
            return response()->json([], 401);
        }

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
        if (!$user) {
            return Inertia::share('error', [
                'status' => '401',
                'message' => 'Unautorized'
            ]);
        }
        
        if ($user->favorites()->wherePivot('commerces_id', $request->post())->exists()) {
            return Inertia::share('error', [
                'status' => '301',
                'message' => 'Favorite already exists, no change'
            ]);
        } else {
            $user->favorites()->attach($request->post());
        }
        return Inertia::share('flash', ['message' => 'OK']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function deleteFavoriteFromUser($commerceId)
    {
        $user = Auth::user();
        if (!$user) {
            return Inertia::share('error', [
                'status' => '401',
                'message' => 'Unautorized'
            ]);
        }

        if ($user->favorites()->wherePivot('commerces_id', $commerceId)->exists()) {
            $user->favorites()->detach($commerceId);
        } else {
            return Inertia::share('error', [
                'status' => '404',
                'message' => 'Ressource not found'
            ]);
        }
        return Inertia::share('flash', ['message' => 'OK']);
    }
}
