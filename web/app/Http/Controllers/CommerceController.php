<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Commerce;
use App\Models\User;
class CommerceController extends Controller
{
    /**
     * function that renders the commerce detail page
     *
     * @param [type] $slug
     * @return void
     */
    public function index($slug){

        $commerce = Commerce::with('mainCategory')->where('slug', $slug)->first();
        if (!$commerce) {
            return Inertia::share('error', [
                'status' => '404',
                'message' => 'Ressource not found'
            ]);
        }

        $userFavorites = Auth::check() ? Auth::user()->favoriteCommerceIds->pluck('favorite_commerce_id', 'favorite_commerce_id')->toArray() : [];
        $commerce->isFavorite = isset($userFavorites[$commerce->id]) ? true : false;

        return Inertia::render('Commerce', [
            'commerce' => $commerce
        ]);
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
    public function reviewAdd(){
    }
}