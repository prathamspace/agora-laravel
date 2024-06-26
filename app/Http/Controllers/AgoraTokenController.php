<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use DateTime;
use DateTimeZone;
use App\Services\src\RtcTokenBuilder;
use App\Services\sample\AgoraTokenGenerator; // Adjust namespace as per your directory structure

class AgoraTokenController extends Controller
{
    private $tokenGenerator;

    public function __construct()
    {
        // Replace these with your Agora App ID and App Certificate
        $appId = "b7ed4aa935ed4317942a13b338067854";
        $appCertificate = "5f4c5efc78844013b05d6eccb168a2d7";

        $this->tokenGenerator = new AgoraTokenGenerator($appId, $appCertificate);
    }

    public function generateToken(Request $request, $channelName)
    {
        // Generate token with integer UID
        $token = $this->tokenGenerator->generateTokenWithUid($channelName);

        // Return the token as JSON response
        return response()->json(['token' => $token]);
    }
}
