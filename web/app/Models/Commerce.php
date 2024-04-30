<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Category;
use App\Models\Review;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\Traits\HasSpatial;
use Illuminate\Support\Facades\DB;


class Commerce extends Model
{
    use HasFactory;
    use HasSpatial;

    protected $appends = ['coordinates'];

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
}
