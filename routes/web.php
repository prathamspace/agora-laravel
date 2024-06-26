<?php



use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AgoraTokenController;


Route::get('/', function () {
    return view('welcome');
});
Route::get('/chat', function () {
    return view('chat'); // Assuming your Blade view is named chat.blade.php
});
Route::get('/voice', function () {
    return view('voice'); // Assuming your Blade view is named chat.blade.php
});
Route::get('/video', function () {
    return view('video');
});
Route::get('/call', function () {
    return view('call');
});
Route::get('/app', function () {
    return view('app');
});


Route::get('/generate-agora-token/{channelName}', [AgoraTokenController::class, 'generateToken']);
