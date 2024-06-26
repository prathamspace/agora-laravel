import AgoraRTC from "agora-rtc-sdk-ng";
import AC from "agora-chat"; // Import Agora Chat SDK

// Replace <Your Agora App ID> with your actual Agora App ID
const YOUR_AGORA_APP_ID = "411165619#1353321";

// Initialize Agora RTC client
const rtcClient = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
});

// Initialize Agora Chat connection
const conn = new AC.connection({
    appKey: YOUR_AGORA_APP_ID,
});

let rtc = {
    localAudioTrack: null,
    localVideoTrack: null,
    client: null, // Make sure this is initialized properly if used
};

// Event handlers for Agora Chat
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

async function generateToken(channelName) {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/services/sample/RtcTokenBuilderSample.php?channelName=${channelName}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch token");
        }
        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error("Error fetching Agora token:", error);
        return null; // Handle error gracefully in your application
    }
}

function generateRandomChannelName() {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 8; // Adjust the length of the channel name as needed
    let channelName = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        channelName += characters.charAt(randomIndex);
    }

    return channelName;
}

const randomChannel = generateRandomChannelName();

async function startVideoCall() {
    try {
        const userId = document.getElementById("userID").value.toString();
        const tempToken = await generateToken(randomChannel); // Use randomChannel here

        if (!tempToken) {
            throw new Error("Failed to generate token");
        }

        await rtcClient.join(
            YOUR_AGORA_APP_ID,
            randomChannel,
            tempToken,
            userId
        );

        const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        const localVideoTrack = await AgoraRTC.createCameraVideoTrack();

        await rtcClient.publish([localAudioTrack, localVideoTrack]);

        console.log("Video call started successfully!");
        console.log("Channel Name:", randomChannel);
        console.log("Temporary Token:", tempToken);

        // Display local video feed
        const localPlayerContainer = document.createElement("div");
        localPlayerContainer.id = "local-player"; // Set an ID for the container
        localPlayerContainer.style.width = "640px";
        localPlayerContainer.style.height = "480px";
        document.body.append(localPlayerContainer);

        // Play local video track in the container
        localVideoTrack.play(localPlayerContainer);

        // Show the leave button
        document.getElementById("leave").style.display = "inline-block";

        // Set rtc object properties
        rtc.localAudioTrack = localAudioTrack;
        rtc.localVideoTrack = localVideoTrack;
        rtc.client = rtcClient;

        console.log("Local video displayed successfully!");
    } catch (error) {
        console.error("Failed to start video call:", error);
    }
}

document.getElementById("leave").onclick = async function () {
    try {
        await rtcClient.unpublish([rtc.localAudioTrack, rtc.localVideoTrack]);
        rtc.localAudioTrack.close();
        rtc.localVideoTrack.close();
        rtcClient.remoteUsers.forEach((user) => {
            const playerContainer = document.getElementById(user.uid);
            playerContainer && playerContainer.remove();
        });
        await rtcClient.leave();

        console.log("Left channel successfully");
        document.getElementById("leave").style.display = "none";
    } catch (error) {
        console.error("Leave channel error:", error);
    }
};

// Function to start an audio call
async function startAudioCall() {
    try {
        const userId = document.getElementById("userID").value.toString();
        const tempToken = await generateToken(randomChannel); // Use randomChannel here
        if (!tempToken) {
            throw new Error("Failed to generate token");
        }

        await rtcClient.join(
            YOUR_AGORA_APP_ID,
            randomChannel,
            tempToken,
            userId
        );

        const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        await rtcClient.publish([localAudioTrack]);

        console.log("Audio call started successfully!");
        console.log("Channel Name:", "testing");
        console.log("Temporary Token:", tempToken);
    } catch (error) {
        console.error("Failed to start audio call:", error);
    }
}

// Expose functions for use in the HTML
window.startVideoCall = startVideoCall;
window.startAudioCall = startAudioCall;

window.onload = function () {
    // Login function
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

    // Logout function
    document.getElementById("logout").onclick = function () {
        conn.close();
        document
            .getElementById("log")
            .appendChild(document.createElement("div"))
            .append("logout");
    };

    // Send peer message function
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
