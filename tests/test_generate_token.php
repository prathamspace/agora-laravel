<?php

require_once __DIR__ . '/../vendor/autoload.php'; // Adjust the path as necessary

use Illuminate\Http\Request;
use App\Http\Controllers\AgoraTokenController;

// Simulate a request
$request = Request::create('/generate-token', 'POST', [
    'channelName' => 'testing_channel', // Replace with your channel name
    'uid' => 12345, // Replace with a valid UID
]);

// Create an instance of AgoraTokenController
$controller = new AgoraTokenController();

// Call the generateToken method
$response = $controller->generateToken($request);

// Decode the JSON response
$jsonResponse = json_decode($response->getContent(), true);

// Print the token
echo 'Generated Token: ' . $jsonResponse['token'] . PHP_EOL;
