<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\CommerceController;
use App\Http\Controllers\CommercesController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', [HomeController::class, 'index']);

/** categories  */
Route::get('/category/{categoryname}', [CategoryController::class, 'index'])
    ->name('category');
Route::get('/menucategories', [CategoryController::class, 'menuCategories'])
    ->name('menucategories');

/** Favorites routes */
Route::get('/favorites', [FavoriteController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('favorites');
Route::post('/favorites', [FavoriteController::class, 'addFavoriteToUser'])
    ->middleware(['auth', 'verified'])
    ->name('favorites.add');
Route::delete('/favorites/{commerceId}', [FavoriteController::class, 'deleteFavoriteFromUser'])
    ->middleware(['auth', 'verified'])
    ->name('favorites.delete');

/** commerce detail page */
Route::get('/commerce/{slug}', [CommerceController::class, 'index'])
    ->name('commerce');
Route::get('/commerce/edit/{id}', [CommerceController::class, 'commerceEdit'])
    ->middleware(['auth', 'verified'])
    ->name('commerce.edit');
Route::post('/commerce/add', [CommerceController::class, 'commerceSave'])
    ->middleware(['auth', 'verified'])
    ->name('commerce.add');
Route::post('/commerce/{slug}/contact', [CommerceController::class, 'commerceContact'])
    ->name('commerce.contact');
Route::get('/commerce/{id}/review', [ReviewController::class, 'getReviews'])
    ->name('commerce.review.get');
Route::post('/commerce/{slug}/review', [ReviewController::class, 'addReview'])
    ->middleware(['auth', 'verified'])
    ->name('commerce.review.add');    


require __DIR__.'/auth.php';


/** Example routes */
Route::get('/example/welcome', function () {
    return Inertia::render('Example/Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/debug', function () {
    dd( session()->token(), Auth::hasUser());
});

Route::get('/example/dashboard', function () {
    return Inertia::render('Example/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('guest')->group(function () {
    Route::get('/example/register', function () {
        return Inertia::render('Example/Auth/Register');
    })->name('example_register');

    Route::get('/example/login', function () {
        return Inertia::render('Example/Auth/Login');
    })->name('example_login');
});

