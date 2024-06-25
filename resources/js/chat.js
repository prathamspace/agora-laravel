// resources/js/chat.js

import AgoraRTC from "agora-rtc-sdk-ng";
import AC from "agora-chat"; // Import Agora Chat SDK

// Replace <Your Agora App ID> with your actual Agora App ID
const YOUR_AGORA_APP_ID = "411165619#1353321";

// Initialize Agora RTC client
const rtcClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

// Initialize Agora Chat connection
const conn = new AC.connection({
    appKey: YOUR_AGORA_APP_ID,
});
conn.addEventHandler("connection&message", {
    onConnected: () => {
        document
            .getElementById("log")
            .appendChild(document.createElement("div"))
            .append("Connect success!");
    },
    onDisconnected: () => {
        document
            .getElementById("log")
            .appendChild(document.createElement("div"))
            .append("Logout success!");
    },
    onTextMessage: (message) => {
        console.log(message);
        document
            .getElementById("log")
            .appendChild(document.createElement("div"))
            .append(
                "Message from: " + message.from + " Message: " + message.msg
            );
    },
    onTokenWillExpire: (params) => {
        document
            .getElementById("log")
            .appendChild(document.createElement("div"))
            .append("Token is about to expire");
    },
    onTokenExpired: (params) => {
        document
            .getElementById("log")
            .appendChild(document.createElement("div"))
            .append("The token has expired");
    },
    onError: (error) => {
        console.log("on error", error);
    },
});

window.onload = function () {
    document.getElementById("login").onclick = function () {
        document
            .getElementById("log")
            .appendChild(document.createElement("div"))
            .append("Logging in...");
        const userId = document.getElementById("userID").value.toString();
        const token = document.getElementById("token").value.toString();
        conn.open({
            user: userId,
            agoraToken: token,
        });
    };

    document.getElementById("logout").onclick = function () {
        conn.close();
        document
            .getElementById("log")
            .appendChild(document.createElement("div"))
            .append("logout");
    };

    document.getElementById("send_peer_message").onclick = function () {
        let peerId = document.getElementById("peerId").value.toString();
        let peerMessage = document
            .getElementById("peerMessage")
            .value.toString();
        let option = {
            chatType: "singleChat",
            type: "txt",
            to: peerId,
            msg: peerMessage,
        };
        let msg = AC.message.create(option);
        conn.send(msg)
            .then((res) => {
                console.log("send private text success");
                document
                    .getElementById("log")
                    .appendChild(document.createElement("div"))
                    .append(
                        "Message sent to: " +
                            peerId +
                            " Message: " +
                            peerMessage
                    );
            })
            .catch(() => {
                console.log("send private text fail");
            });
    };
};

// Function to start a video call
async function startVideoCall() {
    console.log("tessst");
    try {
        const userId = document.getElementById("userID").value.toString();
        const token = document.getElementById("token").value.toString();

        // Join RTC channel
        await rtcClient.join(YOUR_AGORA_APP_ID, "video_channel", token, userId);

        // Create local audio and video tracks
        const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        const localVideoTrack = await AgoraRTC.createCameraVideoTrack();

        // Publish local tracks to the RTC channel
        await rtcClient.publish([localAudioTrack, localVideoTrack]);

        console.log("Video call started successfully!");
    } catch (error) {
        console.error("Failed to start video call:", error);
    }
}

// Function to start an audio call
async function startAudioCall() {
    try {
        const userId = document.getElementById("userID").value.toString();
        const token = document.getElementById("token").value.toString();
        console.log(`boom user ${userId} token ${token}`);
        // Join RTC channel
        await rtcClient.join(YOUR_AGORA_APP_ID, "audio_channel", token, userId);

        // Create local audio track
        const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();

        // Publish local audio track to the RTC channel
        await rtcClient.publish([localAudioTrack]);

        console.log("Audio call started successfully!");
    } catch (error) {
        console.error("Failed to start audio call:", error);
    }
}

// Expose functions for use in the HTML
window.startVideoCall = startVideoCall;
window.startAudioCall = startAudioCall;
