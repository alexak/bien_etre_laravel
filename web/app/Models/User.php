<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

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

    public function reviews() {
        return $this->hasMany(Review::class, 'user_id');
    }

    /**
     * Get the role associated with the user.
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Set the user's role.
     *
     * @param  \App\Models\Role  $role
     * @return void
     */
    public function setRoleAttribute($role)
    {
        $this->attributes['role_id'] = $role->id;
    }

    public static function findByMail(string $email): ?User
    {
        return self::where('email', $email)->first();
    }

    public function sendEmailVerificationNotification() {
        $this->email_token = Str::random(40); 
        $this->save();
      
        $mailData = [
            'userMailToken' => $this->email_token
        ];
        Mail::to($this->email)->send(new WelcomeEmail($mailData));
    }

    public function hasVerifiedEmail() {
        return !empty($this->email_verified_at);
    }

    public function markEmailAsVerified() {
        $this->email_verified_at = now();
        $this->email_token = null;
        dd('done');
    }
}
