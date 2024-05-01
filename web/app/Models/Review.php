<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory;


    protected $fillable = [
        'rating',
        'comment',
        'commerce_id',
        'rating_price',
        'rating_professionalism',
        'rating_cleanliness',
        'rating_kindness',
        'rating_quality',
        'user_id',
        'upvoting'
    ];

    /**
     * Define the relationship between Commerce and Review.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function commerce(): BelongsTo {
        return $this->belongsTo(Commerce::class, 'commerce_id');
    }

    /**
     * Define the relationship between User and Review.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }
}
