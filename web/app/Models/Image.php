<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    /**
     * Define the relationship between Image and Commerce.
     *
     * An Image belongs to one Commerce.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function commerce()
    {
        return $this->belongsTo(Commerce::class, 'commerce_id');
    }
}
