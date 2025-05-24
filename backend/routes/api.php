<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Routes untuk Users
Route::get('/users', [UserController::class, 'index'])->name ('users.index');
Route::post('/users', [UserController::class, 'store'])->name ('users.store');
Route::get('/users/{id}', [UserController::class, 'show'])->name ('users.show');
Route::post('/users/{id}', [UserController::class, 'update'])->name ('users.update');
Route::delete('/users/{id}', [UserController::class, 'destroy'])->name ('users.destroy');