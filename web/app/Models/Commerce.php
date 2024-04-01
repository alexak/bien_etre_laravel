<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\Traits\HasSpatial;

class Commerce extends Model
{
    use HasFactory;
    use HasSpatial;

    protected $casts = [
        'location' => Point::class,
    ];


    public function mainCategory(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'maincategory_id');
    }
}
