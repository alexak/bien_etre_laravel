<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function menuCategories(){
        Inertia::share([
            'categories' => function () {
                return Category::all(); 
            }
        ]);
    }
}
