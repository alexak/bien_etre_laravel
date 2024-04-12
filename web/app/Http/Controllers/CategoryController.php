<?php

namespace App\Http\Controllers;

use App\Models\Commerce;
use App\Models\Category;
use GeoIp2\WebService\Client;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\Objects\Polygon;
use MatanYadaev\EloquentSpatial\Objects\LineString;


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

        $commercesQuery = Commerce::with('mainCategory')
            ->select([
                '*',
                DB::raw('NULL AS distance')
            ])
            ->whereHas('mainCategory', function ($query) use ($categoryname) {
                $query->where('slug', $categoryname); 
            });

        if (!empty($location)) {
            $point = new Point($location['latitude'], $location['longitude']);
            $commercesQuery->withDistanceSphere('location', $point);
        }
        

        $bounds =  $request->has('bounds') ? explode(',', $request->input('bounds')) : null;
        if ($bounds) {
            $keys = ['nwLong', 'nwLat', 'seLong', 'seLat'];
            $coordinates = array_combine($keys, $bounds);

            // Define the four corners of the rectangle
            $polygon = new Polygon([
                new LineString([
                    new Point($coordinates['nwLat'], $coordinates['nwLong']), // Northwest corner
                    new Point($coordinates['seLat'], $coordinates['nwLong']), // Northeast corner
                    new Point($coordinates['seLat'], $coordinates['seLong']), // Southeast corner
                    new Point($coordinates['nwLat'], $coordinates['seLong']), // Southwest corner
                    new Point($coordinates['nwLat'], $coordinates['nwLong'])  // Closing at Northwest corner to complete the loop
                ])
            ]);

            $commercesQuery
                ->whereWithin('location', $polygon)
                ->exists();
        }
          
        $sortBy = $request->has('sortBy') ? $request->input('sortBy') : null;
        $sortDirection = $request->has('sortDirection') ? $request->input('sortDirection') : 'asc';
        if ($sortBy !== null) {
            ($sortBy == 'distance' && !empty($location)) ? $commercesQuery->orderByDistanceSphere('location', $point, $sortDirection) : $commercesQuery->orderBy($sortBy, $sortDirection);
        } else {
            !empty($location) ? $commercesQuery->orderByDistanceSphere('location', $point, 'asc') : $commercesQuery->orderBy('name', 'asc');
        }

        $commerces = $commercesQuery->get();

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

        //$hasGeoJSON = $request->has('type') && $request->input('type') === 'geojson';

        return Inertia::render('Commerces', [
            'commerces' => $commerces,
            'location' => empty($location) ? null : $location,
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
                'latitude' => (float)$latitude,
                'longitude' => (float)$longitude
            ];
        }

        return $location;
    }

}
