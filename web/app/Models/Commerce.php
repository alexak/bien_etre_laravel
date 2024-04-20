<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Category;
use App\Models\Review;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\Traits\HasSpatial;

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
}
