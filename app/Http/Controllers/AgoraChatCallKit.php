<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AgoraController extends Controller
{
    /**
     * Initialize AgoraChatCallKit.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function initChatKit(Request $request)
    {
        $appId = 'your_agora_app_id';
        $agoraUid = 'your_agora_uid'; // Should be the UID of the current user
        $connection = 'your_chat_sdk_connection'; // Replace with your Chat SDK Connection instance

        // Initialize AgoraChatCallKit
        Callkit::init($appId, $agoraUid, $connection);

        return response()->json(['message' => 'AgoraChatCallKit initialized successfully']);
    }

    /**
     * Start a call using AgoraChatCallKit.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function startCall(Request $request)
    {
        // Handle incoming call start request
        $options = $request->all(); // Ensure you validate and sanitize input here

        Callkit::startCall($options);

        return response()->json(['message' => 'Call started successfully']);
    }

    /**
     * Answer a call using AgoraChatCallKit.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function answerCall(Request $request)
    {
        // Handle incoming call answer request
        $result = $request->input('result');
        $accessToken = $request->input('accessToken');

        Callkit::answerCall($result, $accessToken);

        return response()->json(['message' => 'Call answered successfully']);
    }
}
