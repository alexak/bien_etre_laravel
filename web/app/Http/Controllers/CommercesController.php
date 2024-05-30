<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commerce;
use App\Models\Category;
use GeoIp2\WebService\Client;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\Objects\Polygon;
use MatanYadaev\EloquentSpatial\Objects\LineString;


class CommercesController extends Controller
{
    /**
     * Function that gets the commerces by categories
     *
     * @param string $categoryname
     * @param Request $request
     * @return void
     */
    public function getByCategory(string $categoryname, Request $request){

        $filter = $request->get('filter');
        $filter['category'] = $categoryname; 
        $sort = $request->has('sort') ? $request->get('sort') : null;
        $location = $this->getLocation($request);
        $commerces = $this->getCommerces($filter, $sort, $location);

        return Inertia::render('Commerces', [
            'initialCommerces' => $commerces,
            'filter' => $filter,
            'sort' => $sort,
            'location' => empty($location) ? null : $location,
        ]);
    }


    /**
     * Function that gets the commerces by filter
     *
     * @param Request $request
     * @param [type] $location
     * @return void
     */
    public function getByFilter(Request $request){
        $filter = $request->get('filter');
        $sort = $request->has('sort') ? $request->get('sort') : null;
        $location = $this->getLocation($request);
        $commerces = $this->getCommerces($filter, $sort, $location);

        return Inertia::render('Commerces', [
            'initialCommerces' => $commerces,
            'filter' => $filter,
            'sort' => $sort,
            'location' => empty($location) ? null : $location,
        ]);
    }



    /**
     * Fethes the commerces from the database
     *
     * @param array $filter
     * @param array $sort
     * @param array $location
     */
    private function getCommerces(array $filter, array|null $sort, array $location){
        $commercesQuery = Commerce::with('mainCategory')
            ->select([
                '*',
                DB::raw('NULL AS distance')
            ]);
    
        if($filter['category']) {
            $commercesQuery->whereHas('mainCategory', function ($query) use ($filter) {
                    $query->where('slug', $filter['category']); 
                });
        }
       
        if (isset($filter['bounds'])) {
            // Define the four corners of the rectangle
            $polygon = new Polygon([
                new LineString([
                    new Point($filter['bounds']['_ne']['lat'], $filter['bounds']['_ne']['lng']), // Northeast corner
                    new Point($filter['bounds']['_sw']['lat'], $filter['bounds']['_ne']['lng']), // Northwest corner using '_sw' lat and '_ne' lng
                    new Point($filter['bounds']['_ne']['lat'], $filter['bounds']['_sw']['lng']), // Southeast corner using '_ne' lat and '_sw' lng
                    new Point($filter['bounds']['_sw']['lat'], $filter['bounds']['_sw']['lng']), // Southwest corner
                    new Point($filter['bounds']['_ne']['lat'], $filter['bounds']['_ne']['lng'])  // Closing at Northeast corner to complete the loop
                ])
            ]);

            $commercesQuery
                ->whereWithin('location', $polygon)
                ->exists();
        }

        
        if (!empty($location)) {
            $point = new Point($location['latitude'], $location['longitude']);
            $commercesQuery->withDistanceSphere('location', $point);
        }
    
        if ($sort !== null) {
            ($sort['sortBy'] == 'distance' && !empty($location)) ? 
                $commercesQuery->orderByDistanceSphere('location', $point, $sort['sortDirection']) 
                : $commercesQuery->orderBy($sort['sortBy'], $sort['sortDirection']);
        } else {
            !empty($location) ? $commercesQuery->orderByDistanceSphere('location', $point, 'asc') : $commercesQuery->orderBy('name', 'asc');
        }

        $commerces = $commercesQuery->get();
        $commerces = $this->getFavorites($commerces);

        return $commerces;
    }

    private function getFavorites($commerces) {
        $userFavorites = Auth::check() ? Auth::user()->favoriteCommerceIds->pluck('favorite_commerce_id', 'favorite_commerce_id')->toArray() : [];
        foreach($commerces as $commerce) {
            $commerce->isFavorite = isset($userFavorites[$commerce->id]) ? true : false;
        }

        return $commerces;
    }









    /*
    public function index($categoryname, Request $request) 
    {
        //TODO: create route commerces linking to here 
        dd($categoryname);
        $location = $this->getLocation($request);

        $commercesQuery = Commerce::with('mainCategory')
            ->select(
                [
                    '*',
                    DB::raw('NULL AS distance')
                ]
            )
            ->whereHas('mainCategory', function ($query) use ($categoryname) {
                $query->where('slug', $categoryname); 
            });

        if (!empty($location)) {
            $point = new Point($location['latitude'], $location['longitude']);
            $commercesQuery->withDistanceSphere('location', $point);
        }
        
        $bounds = $request->query('bounds') ? $request->query('bounds') : null;
        if ($bounds) {
            // Define the four corners of the rectangle
            $polygon = new Polygon([
                new LineString([
                    new Point($bounds['_ne']['lat'], $bounds['_ne']['lng']), // Northeast corner
                    new Point($bounds['_sw']['lat'], $bounds['_ne']['lng']), // Northwest corner using '_sw' lat and '_ne' lng
                    new Point($bounds['_ne']['lat'], $bounds['_sw']['lng']), // Southeast corner using '_ne' lat and '_sw' lng
                    new Point($bounds['_sw']['lat'], $bounds['_sw']['lng']), // Southwest corner
                    new Point($bounds['_ne']['lat'], $bounds['_ne']['lng'])  // Closing at Northeast corner to complete the loop
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

        if($bounds){
            dd($commerces);
        }
    }
    */


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
