// resources/js/agoraLogic.js
import AgoraRTC from "agora-rtc-sdk-ng";

let rtc = {
    localAudioTrack: null,
    localVideoTrack: null,
    client: null,
};

let options = {
    appId: "b7ed4aa935ed4317942a13b338067854", // Replace with your Agora App ID
    channel: "dufpnxdxsc", // Replace with your channel name
    token: "007eJxTYHh1ikttXsWhLQ7aVcYnWPVtvRae99h+arI4q73l1JlRmZMVGJLMU1NMEhMtjU2BtLGhuaWJUaKhcZKxsYWBmbmFqcm0xMq0hkBGhpK0f8yMDBAI4nMxpJSmFeRVpFQUJzMwAAB99yAN", // Replace with your temporary token
    uid: null,
};

rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

document.getElementById("join").onclick = async function () {
    try {
        await rtc.client.join(
            options.appId,
            options.channel,
            options.token,
            options.uid
        );
        rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

        const localPlayerContainer = document.createElement("div");
        localPlayerContainer.id = options.uid;
        localPlayerContainer.style.width = "640px";
        localPlayerContainer.style.height = "480px";
        document.body.append(localPlayerContainer);
        rtc.localVideoTrack.play(localPlayerContainer);

        console.log("Joined channel successfully");
    } catch (error) {
        console.error("Join channel error:", error);
    }
};

document.getElementById("leave").onclick = async function () {
    try {
        await rtc.client.unpublish([rtc.localAudioTrack, rtc.localVideoTrack]);
        rtc.localAudioTrack.close();
        rtc.localVideoTrack.close();
        rtc.client.remoteUsers.forEach((user) => {
            const playerContainer = document.getElementById(user.uid);
            playerContainer && playerContainer.remove();
        });
        await rtc.client.leave();

        console.log("Left channel successfully");
    } catch (error) {
        console.error("Leave channel error:", error);
    }
};
