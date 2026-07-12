<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\AllowanceController;
use App\Http\Controllers\DesignationController;
use App\Http\Controllers\LeaveTypeController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('departments', DepartmentController::class);
    Route::resource('designations', DesignationController::class);
    Route::resource('allowances', AllowanceController::class);
    Route::resource('leave-types', LeaveTypeController::class);
});

require __DIR__ . '/settings.php';
