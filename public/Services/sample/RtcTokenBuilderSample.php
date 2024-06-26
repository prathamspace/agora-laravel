<?php
include("../src/RtcTokenBuilder.php");

// Retrieve channelName parameter from URL
$channelName = isset($_GET['channelName']) ? $_GET['channelName'] : "default_channel";

// Need to set environment variable AGORA_APP_ID
$appId = "b7ed4aa935ed4317942a13b338067854";
// Need to set environment variable AGORA_APP_CERTIFICATE
$appCertificate = "5f4c5efc78844013b05d6eccb168a2d7";

$uid = null;
$uidStr = null;
$role = RtcTokenBuilder::RoleAttendee;
$expireTimeInSeconds = 3600;
$currentTimestamp = (new DateTime("now", new DateTimeZone('UTC')))->getTimestamp();
$privilegeExpiredTs = $currentTimestamp + $expireTimeInSeconds;

// Generate the token
$token = RtcTokenBuilder::buildTokenWithUid($appId, $appCertificate, $channelName, $uid, $role, $privilegeExpiredTs);

// Prepare response as JSON
$response = [
    'channel' => $channelName,
    'token' => $token
];

// Set response headers to return JSON
header('Content-Type: application/json');

// Output JSON response
echo json_encode($response);
die;
