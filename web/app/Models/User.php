<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the commerces a user has favorited, including the linked commerces.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function favorites()
    {
        return $this->belongsToMany(Commerce::class, 'users_commerces', 'user_id', 'commerces_id');
    }


    public function favoriteCommerceIds()
    {
        return $this->belongsToMany(Commerce::class, 'users_commerces', 'user_id', 'commerces_id')
            ->select('commerces.id AS favorite_commerce_id');
    }
}
