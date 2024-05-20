<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class OpeningHour extends Model
{
    use HasFactory;

    protected $fillable = [
        'commerce_id',
        'comment',
        'day_of_week',
        'opening_time',
        'closing_time',
        'special_date'
    ];

    public function commerce()
    {
        return $this->belongsTo(Commerce::class);
    }
}