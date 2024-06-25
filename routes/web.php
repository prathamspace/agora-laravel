<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AgoraController;
use Illuminate\Support\Facades\Response;
use Agora\RtcTokenBuilder;

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



Route::get('/generate-token', function () {
    $appID = "YOUR_APP_ID";
    $appCertificate = "YOUR_APP_CERTIFICATE";
    $channelName = "test";
    $uid = 0;
    $userAccount = "user_account";
    $role = RtcTokenBuilder::RoleAttendee;
    $expireTimeInSeconds = 3600;
    $currentTimestamp = (new DateTime("now", new DateTimeZone('UTC')))->getTimestamp();
    $privilegeExpireTs = $currentTimestamp + $expireTimeInSeconds;

    $token = RtcTokenBuilder::buildTokenWithUid($appID, $appCertificate, $channelName, $uid, $role, $privilegeExpireTs);
    return Response::json(['token' => $token]);
});

Route::get('/init-chatkit', [AgoraController::class, 'initChatKit']);
Route::post('/start-call', [AgoraController::class, 'startCall']);
Route::post('/answer-call', [AgoraController::class, 'answerCall']);
