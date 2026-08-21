<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MotorcycleController;
use App\Http\Controllers\BrandController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (auth()->check() && auth()->user()->role === 'admin') {
        return redirect('/admin/motor');
    }

    $motorcycles = App\Models\Motorcycle::with('brand')->latest()->take(3)->get();
    return Inertia::render('Dashboard', [
        'motorcycles' => $motorcycles
    ]);
})->name('dashboard');
Route::get('/katalog', function () {
    $motorcycles = App\Models\Motorcycle::with('brand')->latest()->get();
    return Inertia::render('KatalogMotor', [
        'motorcycles' => $motorcycles
    ]);
})->name('katalog');
Route::get('/motor/{motorcycle}', [MotorcycleController::class, 'show']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/motor', [MotorcycleController::class, 'index']);
    Route::get('/admin/motor/create', [MotorcycleController::class, 'create']);
    Route::post('/admin/motor', [MotorcycleController::class, 'store']);
    Route::get('/admin/motor/{motorcycle}/edit', [MotorcycleController::class, 'edit']);
    Route::put('/admin/motor/{motorcycle}', [MotorcycleController::class, 'update']);
    Route::delete('/admin/motor/{motorcycle}', [MotorcycleController::class, 'destroy']);

    Route::get('/admin/brand', [BrandController::class, 'index']);
    Route::get('/admin/brand/create', [BrandController::class, 'create']);
    Route::post('/admin/brand', [BrandController::class, 'store']);
    Route::get('/admin/brand/{brand}/edit', [BrandController::class, 'edit']);
    Route::put('/admin/brand/{brand}', [BrandController::class, 'update']);
    Route::delete('/admin/brand/{brand}', [BrandController::class, 'destroy']);
});

require __DIR__.'/auth.php';