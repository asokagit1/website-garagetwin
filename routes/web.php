<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MotorcycleController;
use App\Http\Controllers\BrandController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    $motorcycles = App\Models\Motorcycle::with('brand')
        ->latest()
        ->take(3)
        ->get();

    return Inertia::render('Dashboard', [
        'motorcycles' => $motorcycles,
        'isAdmin' => false,
    ]);
});

Route::get('/katalog', function () {
    $motorcycles = App\Models\Motorcycle::with('brand')
        ->latest()
        ->get();

    return Inertia::render('KatalogMotor', [
        'motorcycles' => $motorcycles,
        'isAdmin' => false,
    ]);
})->name('katalog');

Route::get('/motor/{motorcycle}', [MotorcycleController::class, 'show']);


/*
|--------------------------------------------------------------------------
| AUTHENTICATED ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | User Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get('/dashboard', function () {
        $motorcycles = App\Models\Motorcycle::with('brand')
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Dashboard', [
            'motorcycles' => $motorcycles,
            'isAdmin' => false,
        ]);
    })->middleware('verified')->name('dashboard');


    /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');


    /*
    |--------------------------------------------------------------------------
    | ADMIN DASHBOARD
    |--------------------------------------------------------------------------
    */

    Route::get('/admin/dashboard', function () {

        $motorcycles = App\Models\Motorcycle::with('brand')
            ->latest()
            ->take(3)
            ->get();

        $brands = App\Models\Brand::all();

        return Inertia::render('Dashboard', [
            'motorcycles' => $motorcycles,
            'brands' => $brands,
            'isAdmin' => true,
        ]);

    })->name('admin.dashboard');


    /*
    |--------------------------------------------------------------------------
    | ADMIN KATALOG
    |--------------------------------------------------------------------------
    */

    Route::get('/admin/katalog', function () {

        $motorcycles = App\Models\Motorcycle::with('brand')
            ->latest()
            ->get();

        $brands = App\Models\Brand::all();

        return Inertia::render('KatalogMotor', [
            'motorcycles' => $motorcycles,
            'brands' => $brands,
            'isAdmin' => true,
        ]);

    })->name('admin.katalog');


    /*
    |--------------------------------------------------------------------------
    | ADMIN MOTOR
    |--------------------------------------------------------------------------
    */

    Route::get('/admin/motor', [MotorcycleController::class, 'index']);

    Route::get('/admin/motor/create', [MotorcycleController::class, 'create']);

    Route::post('/admin/motor', [MotorcycleController::class, 'store']);

    Route::get('/admin/motor/{motorcycle}/edit', [MotorcycleController::class, 'edit']);

    Route::put('/admin/motor/{motorcycle}', [MotorcycleController::class, 'update']);

    Route::delete('/admin/motor/{motorcycle}', [MotorcycleController::class, 'destroy']);


    /*
    |--------------------------------------------------------------------------
    | ADMIN BRAND
    |--------------------------------------------------------------------------
    */

    Route::get('/admin/brand', [BrandController::class, 'index']);

    Route::get('/admin/brand/create', [BrandController::class, 'create']);

    Route::post('/admin/brand', [BrandController::class, 'store']);

    Route::get('/admin/brand/{brand}/edit', [BrandController::class, 'edit']);

    Route::put('/admin/brand/{brand}', [BrandController::class, 'update']);

    Route::delete('/admin/brand/{brand}', [BrandController::class, 'destroy']);
});


require __DIR__.'/auth.php';