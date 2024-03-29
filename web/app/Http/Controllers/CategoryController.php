<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Commerce;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class CategoryController extends Controller
{
    public function index($categoryname) 
    {
        // Query the commerces with pagination and eager loading of mainCategory
        $commerces =  Commerce::with('mainCategory')->get();
        
        $userFavorites = Auth::check() ? Auth::user()->favoriteCommerceIds->pluck('favorite_commerce_id', 'favorite_commerce_id')->toArray() : [];
        foreach($commerces as $commerce) {
            $commerce->isFavorite = isset($userFavorites[$commerce->id]) ? true : false;
        }
 
        
        //$commerces = Commerce::with('mainCategory')
            //->whereHas('mainCategory', function ($query) use ($categoryname) {
            //    $query->where('name', $categoryname); // Assuming you have 'name' column in your categories table
            //})
            //->orderBy('name');
            //->paginate(10); // Change the number as per your requirement

        // Loop through each commerce to set the additional attributes
        //$commerces->each(function ($commerce) {
            // This will automatically use the getFavoritesAttribute accessor from the Commerce model
            // Remove or adjust the dummy data as per your actual implementation
            //$commerce->distance = rand(1, 10);
            //$commerce->price = rand(10, 100);
            // Since $commerce->id and other properties are actual model attributes, you shouldn't randomly change them here
        //});

        return Inertia::render('Commerces', [
            'commerces' => $commerces
        ]);
    }
}
