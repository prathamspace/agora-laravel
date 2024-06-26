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


echo "channel " . $channelName;
echo "App Id: " . $appId . PHP_EOL;
echo "App Certificate: " . $appCertificate . PHP_EOL;
if ($appId == "" || $appCertificate == "") {
    echo "Need to set environment variable AGORA_APP_ID and AGORA_APP_CERTIFICATE" . PHP_EOL;
    exit;
}

$token = RtcTokenBuilder::buildTokenWithUid($appId, $appCertificate, $channelName, $uid, $role, $privilegeExpiredTs);
echo 'Token with int uid: ' . $token . PHP_EOL;

$token = RtcTokenBuilder::buildTokenWithUserAccount($appId, $appCertificate, $channelName, $uidStr, $role, $privilegeExpiredTs);
echo 'Token with user account: ' . $token . PHP_EOL;
