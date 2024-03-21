<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Category;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'categories' => function () {
                return Category::all(); 
            },
            'auth' => [
                'user' => function () {
                    return optional(auth()->user()); // Optional chaining for user
                },
            ],
        ]);
    }
}
