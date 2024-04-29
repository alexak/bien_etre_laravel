<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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
            'user' => function() {
                return $this->getUserAttributes();
            },
            'mapbox' => env('MAPBOX')
        ]);
    }

    private function getUserAttributes() {
        $user = null;
        if (Auth::hasUser()) {
            $authUser = Auth::user();
            $user = [
                'id' => $authUser->id,
                'name' => $authUser->name
            ];
        }
        return $user;
    }
}
