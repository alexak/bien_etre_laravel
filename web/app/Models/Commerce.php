<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Commerce extends Model
{
    use HasFactory;

    public function mainCategory(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'maincategory_id');
    }
}
