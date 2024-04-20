<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;


    /**
     * Define the relationship between Commerce and Category.
     * An Image belongs to one Commerce.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function commerce(): BelongsTo {
        return $this->belongsTo(Commerce::class, 'commerce_id');
    }
}
