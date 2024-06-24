<?php

use Illuminate\Support\Facades\Route;

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
