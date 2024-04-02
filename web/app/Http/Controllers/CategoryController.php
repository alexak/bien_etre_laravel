<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Commerce;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use MatanYadaev\EloquentSpatial\Objects\Point;
use Illuminate\Support\Facades\DB;
use GeoIp2\WebService\Client;
use Illuminate\Support\Facades\Log;



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
        $location = $this->getLocation($request);

        $commerces = Commerce::with('mainCategory')
            ->select('*', DB::raw('NULL AS distance'));

        if (!empty($location)) {
            $point = new Point($location['latitude'], $location['longitude']);
            $commerces->withDistanceSphere('location', $point);
        }
          
        $sortBy = $request->has('sortBy') ? $request->input('sortBy') : null;
        $sortDirection = $request->has('sortDirection') ? $request->input('sortDirection') : 'asc';
        if ($sortBy !== null) {
            ($sortBy == 'distance' && !empty($location)) ? $commerces->orderByDistance('location', $point, $sortDirection) : $commerces->orderBy($sortBy, $sortDirection);
        }

        $commerces = $commerces->get();

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

        return Inertia::render('Commerces', [
            'commerces' => $commerces
        ]);
    }


    /**
     * Function that gets user position
     *
     * @param Request $request
     * @return array
     */
    private function getLocation(Request $request): array {

        // get location from url provided by client
        $latitude = $request->has('lat') ? $request->input('lat') : null;
        $longitude = $request->has('long') ? $request->input('long') : null;

        // get Ip from session
        $latitude = $latitude==null ? session('latitude') : $latitude;
        $longitude = $longitude==null ? session('longitude') : $longitude;

        // get location by ip address
        if ($latitude == null || $longitude == null) {
            try{
                $maxmindClient = new Client(env('MAXMIND_ACCOUNTID'), env('MAXMIND_LICENSEKEY'), ['en'], ['host' => 'geolite.info']);
                $maxminResponse = $maxmindClient->city($request->ip());
                
                $latitude=$maxminResponse->location->latitude;
                $longitude=$maxminResponse->location->longitude;
                
                session(['latitude'=>$latitude]);
                session(['longitude'=>$longitude]);
            } catch (\Throwable $e) {
                log::warning('MaxMind API Error: ' . $e->getMessage());
            }
        }

        $location=[];
        if (($latitude !== null) && ($longitude !== null )) {
            $location = [
                'latitude' => $latitude,
                'longitude' => $longitude
            ];
        }

        return $location;
    }

}
