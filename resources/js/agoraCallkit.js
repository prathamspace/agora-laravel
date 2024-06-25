import Callkit from "chat-callkit";

// Initialize AgoraChatCallKit
function initAgoraCallkit(appId, agoraUid, connection) {
    Callkit.init(appId, agoraUid, connection);
}

// Send a call invitation
function startCall(options) {
    Callkit.startCall(options);
}

// Answer a call
function answerCall(result, accessToken) {
    Callkit.answerCall(result, accessToken);
}

// Handle call state changes
function handleCallStateChange(info) {
    switch (info.type) {
        case "hangup":
            console.log("The call is hung up.");
            break;
        case "accept":
            console.log("The callee accepts the call invitation.");
            break;
        case "refuse":
            console.log("The callee refuses the call invitation.");
            break;
        case "user-published":
            console.log(
                "A remote user publishes media streams during the call."
            );
            break;
        case "user-unpublished":
            console.log(
                "A remote user stops publishing media streams during the call."
            );
            break;
        case "user-left":
            console.log("A remote user leaves the call.");
            break;
        default:
            break;
    }
}

export { initAgoraCallkit, startCall, answerCall, handleCallStateChange };
