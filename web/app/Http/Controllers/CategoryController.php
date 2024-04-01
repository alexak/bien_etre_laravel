<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Commerce;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use MatanYadaev\EloquentSpatial\Objects\Point;


class CategoryController extends Controller
{
    public function menuCategories(){
        Inertia::share([
            'categories' => function () {
                return Category::all(); 
            }
        ]);
    }

    public function index($categoryname, Request $request) 
    {

        // test from url
        if ($request->has('lat') && $request->has('long')) {
            $latitude = $request->input('lat');
            $longitude = $request->input('long');
        }


        // test from session
        // test from ip to geo

        $commerces = Commerce::with('mainCategory')
            ->withDistanceSphere('location', new Point($latitude, $longitude))
            ->first();
            //->get();

        //$commerces = Commerce::select('name', 'image', 'slug', 'rating', 'isAtHome', 'isAtStore', 'maincategory_id')
            //->with('mainCategory')
            //->selectRaw("ST_Distance_Sphere(position, POINT($longitude, $latitude)) AS distance")
            //->get();


        // Query the commerces with pagination and eager loading of mainCategory
        //$commerces =  Commerce::select('name', 'image', 'slug', 'rating', 'isAtHome', 'isAtStore', 'maincategory_id')
        //    ->with('mainCategory')
        //    ->get();
        
        $userFavorites = Auth::check() ? Auth::user()->favoriteCommerceIds->pluck('favorite_commerce_id', 'favorite_commerce_id')->toArray() : [];
        foreach($commerces as $commerce) {

            var_dump($commerce->location->latitude);
            var_dump($commerce->location->longitude);
            var_dump($commerce->distance/1000);
            die();

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
