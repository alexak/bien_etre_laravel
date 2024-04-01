<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Commerce;
use App\Models\Category;
use App\Models\User;
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
            $commerces->withDistanceSphere('location', new Point($location['latitude'], $location['longitude']));
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
