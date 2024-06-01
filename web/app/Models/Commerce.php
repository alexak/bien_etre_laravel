<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Category;
use App\Models\Review;
use App\Models\City;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\Traits\HasSpatial;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use GuzzleHttp\Client;


class Commerce extends Model
{
    use HasFactory;
    use HasSpatial;

    protected $appends = [
        'coordinates', 
        'formatted_opening_hours',
        'address',
        'contact'
    ];
    
    protected $hidden = [
        'openingHours', 
        'location',
        'city_id',
        'maincategory_id',
        'address_1',
        'address_2',
        'city',
        'contact_mail', 
        'contact_phone'
    ];

    protected $casts = [
        'location' => Point::class,
    ];

    public function getCoordinatesAttribute() {
        return [
            'latitude' => $this->location->latitude,
            'longitude' => $this->location->longitude,
        ];
    }

    /**
     * Define the relationship between Commerce and Category.
     * An Image belongs to one Commerce.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function mainCategory(): BelongsTo {
        return $this->belongsTo(Category::class, 'maincategory_id');
    }

    public function images() {
        return $this->hasMany(Image::class, 'commerce_id');
    }

    public function reviews() {
        return $this->hasMany(Review::class, 'commerce_id');
    }

    public function getAverageRatingAttribute()
    {
        return round($this->reviews()->avg('rating'));
    }

    public function getDetailedAverageRatings()
    {
        $ratings = $this->reviews()
            ->select(
                DB::raw('avg(rating_price) as avgPriceRating'),
                DB::raw('avg(rating_professionalism) as avgProfessionalismRating'),
                DB::raw('avg(rating_cleanliness) as avgCleanlinessRating'),
                DB::raw('avg(rating_kindness) as avgKindnessRating'),
                DB::raw('avg(rating_quality) as avgQualityRating')
            )
            ->first();

        $detailedAvg = [];
        foreach ($ratings->attributes as $key => $value) {
            $detailedAvg[$key] = round(floatval($value), 1);
        }
        
        return $detailedAvg;
    }

    public function getRatingsCount()
    {
        $ratingCounts = $this->reviews()
            ->select(DB::raw('rating,count(rating) as count'))
            ->orderBy('rating')
            ->groupBy('rating')
            ->get();

        $counts = $ratingCounts->mapWithKeys(function ($item) {
            return [$item->rating => $item->count];
        })->toArray();

        for ($i = 0; $i < 6; $i++) {
            $counts[$i] = $counts[$i] ?? 0;
        }
        ksort($counts);

        return $counts;
    }

    public function openingHours()
    {
        return $this->hasMany(OpeningHour::class);
    }

    public function getFormattedOpeningHoursAttribute()
    {
        $regularHours = array_fill(0, 7, []);
        $specialHours = [];

        foreach ($this->openingHours as $openingHour) {
            if ($openingHour->special_date) {
                $specialDate = Carbon::parse($openingHour->special_date)->format('d.m');
                if (!isset($specialHours[$specialDate])) {
                    $specialHours[$specialDate] = [];
                }
                $specialHours[$specialDate][] = [
                    'opening_time' => $openingHour->opening_time,
                    'closing_time' => $openingHour->closing_time
                ];
            } else {
                $dayIndex = $openingHour->day_of_week - 1;
                $regularHours[$dayIndex][] = [
                    'opening_time' => $openingHour->opening_time,
                    'closing_time' => $openingHour->closing_time
                ];
            }
        }

        // Sort the regular hours by opening_time
        foreach ($regularHours as &$hours) {
            usort($hours, function ($a, $b) {
                return strcmp($a['opening_time'], $b['opening_time']);
            });
        }

        // Sort the special hours by opening_time
        foreach ($specialHours as &$hours) {
            usort($hours, function ($a, $b) {
                return strcmp($a['opening_time'], $b['opening_time']);
            });
        }

        return [
            'regular' => $regularHours,
            'special' => $specialHours
        ];
    }

    public function city(): BelongsTo {
        return $this->belongsTo(City::class, 'city_id');
    }


    public function getAddressAttribute(){

            // Check if coordinates are available and address is empty
    if (!empty($this->coordinates) && (empty($this->address_1) || empty($this->address_2))) {
        //$this->fetchAndSaveAddressFromCoordinates(); //TODO get address for coordinates
    }

        return [
            'address_1' => $this->address_1,
            'address_2' => $this->address_2,
            'postal_code' => $this->city->postal_code,
            'city' => $this->city->place_name,
            'coordinates' => $this->coordinates
        ];
    }

    public function getContactAttribute()
    {
        return [
            'mail' => $this->contact_mail,
            'phone' => $this->contact_phone,
        ];
    }

    private function fetchAndSaveAddressFromCoordinates()
    {
        // Ensure valid coordinates format (lat, lng)
        if (count($this->coordinates) !== 2) {
            return; // Handle invalid coordinates gracefully (e.g., log error)
        }

        $latitude = $this->coordinates['latitude'];
        $longitude = $this->coordinates['longitude'];
        $mapboxToken = env('MAPBOX');

        $client = new Client();
        try {

            // TODO: ude free geocoder such as nominatim or geonames gere
            $url = "https://api.mapbox.com/geocoding/v5/mapbox.places-permanent/$longitude,$latitude.json?access_token=$mapboxToken";
            $response = $client->get($url);

            if ($response->getStatusCode() === 200) {
                $data = json_decode($response->getBody(), true);

                // Extract relevant address information (handle potential errors)
                $addressComponents = [];
                if (isset($data['features'][0]['properties'])) {
                    $addressComponents = $data['features'][0]['properties'];
                }

                // Update model attributes with fetched address components (customize based on Mapbox response)
                $this->address_1 = isset($addressComponents['address']) ? $addressComponents['address'] : '';
                $this->address_2 = isset($addressComponents['address_2']) ? $addressComponents['address_2'] : '';
                $this->save(); // Persist changes to database
            } else {
                // Handle API request failures (e.g., log error)
            }
        } catch (Exception $e) {
            // Handle potential exceptions during API calls
        }
    }
}
