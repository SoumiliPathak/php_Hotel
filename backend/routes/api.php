<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\BookingsController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Temp_bookingsController;
use App\Http\Controllers\PaymentController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/add-room',[RoomController::class,'add'])->middleware('auth:sanctum');
Route::get('/show-rooms',[RoomController::class,'show']);
Route::get('/show-room-details/{id}',[RoomController::class,'show_details']);
Route::post('/search-room',[RoomController::class,'filter']);
Route::delete('/delete-room/{id}',[RoomController::class,'delete'])->middleware('auth:sanctum');
Route::post('/edit-room/{id}',[RoomController::class,'edit'])->middleware('auth:sanctum');

Route::post('/register',[UserController::class,'add']);
Route::post('/login',[UserController::class,'login']);
Route::post('/logout',[UserController::class,'logout'])->middleware('auth:sanctum');
Route::get('/show-user-details',[UserController::class,'show'])->middleware('auth:sanctum');
Route::delete('/delete-user',[UserController::class,'delete'])->middleware('auth:sanctum');
Route::post('/edit-user',[UserController::class,'edit'])->middleware('auth:sanctum');
Route::post('/forgot-password',[UserController::class,'forgot_password']);
Route::post('/forgot-password-login',[UserController::class,'forgot_password_login']);

Route::post('/add-review',[ReviewController::class,'add'])->middleware('auth:sanctum');
Route::get('/show-reviews/{from?}',[ReviewController::class,'show']);
Route::delete('/delete-review/{id}',[ReviewController::class,'delete'])->middleware('auth:sanctum');
Route::put('/edit-review/{id}',[ReviewController::class,'edit'])->middleware('auth:sanctum');

Route::post('/check-availability/{id}',[BookingsController::class,'check_availability']);
Route::post('/book/{transaction_id}/{booking_id}',[BookingsController::class,'add'])->middleware('auth:sanctum');
Route::get('/show-current-bookings',[BookingsController::class,'show_current_bookings'])->middleware('auth:sanctum');
Route::get('/show-past-bookings',[BookingsController::class,'show_past_bookings'])->middleware('auth:sanctum');
Route::delete('/cancel-booking/{id}',[BookingsController::class,'delete'])->middleware('auth:sanctum');

Route::post('/save-temp-bookings',[Temp_bookingsController::class,'add'])->middleware('auth:sanctum');

Route::post('/register-admin',[AdminController::class,'add']);
Route::post('/admin-login',[AdminController::class,'login']);
Route::post('/admin-logout',[AdminController::class,'logout'])->middleware('auth:sanctum');
Route::get('/show-users',[UserController::class,'show_all'])->middleware('auth:sanctum');
Route::get('/show-bookings',[BookingsController::class,'show_all'])->middleware('auth:sanctum');

Route::post('/pay/{id}',[PaymentController::class,'pay'])->middleware('auth:sanctum');