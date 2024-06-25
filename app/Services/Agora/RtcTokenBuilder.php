<?php

namespace App\Services\Agora;

class RtcTokenBuilder
{
    const ROLE_PUBLISHER = 1;
    const ROLE_SUBSCRIBER = 2;

    public static function buildTokenWithUid($appID, $appCertificate, $channelName, $uid, $role, $privilegeExpireTs)
    {
        return self::buildTokenWithUserAccount($appID, $appCertificate, $channelName, $uid, $role, $privilegeExpireTs);
    }

    public static function buildTokenWithUserAccount($appID, $appCertificate, $channelName, $account, $role, $privilegeExpireTs)
    {
        $currentTimestamp = (new \DateTime("now", new \DateTimeZone('UTC')))->getTimestamp();
        $expire = $privilegeExpireTs - $currentTimestamp;
        $params = array(
            'appId' => $appID,
            'appCertificate' => $appCertificate,
            'channelName' => $channelName,
            'uid' => $account,
            'uid_str' => strval($account),
            'role' => $role,
            'privilegeExpireTs' => $privilegeExpireTs,
            'expire' => $expire
        );
        return self::generateToken($params);
    }

    private static function generateToken($params)
    {
        $token = $params['appId'] . ':' . base64_encode(hash_hmac('sha256', $params['uid_str'] . ':' . $params['channelName'] . ':' . $params['role'] . ':' . $params['privilegeExpireTs'], $params['appCertificate'], true));
        return $token;
    }
}
