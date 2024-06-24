import AgoraRTC from "agora-rtc-sdk-ng";

let rtc = {
    localAudioTrack: null,
    client: null,
};

let options = {
    appId: "b7ed4aa935ed4317942a13b338067854", // Replace with your Agora App ID
    channel: "test", // Replace with your channel name
    token: "007eJxTYEgVf7aszWCfwJdbHLv3nT00dblyuU5y/4Ii43VnN/PMuTddgSHJPDXFJDHR0tgUSBsbmluaGCUaGicZG1sYmJlbmJoYB1SmNQQyMjSduMPMyACBID4LQ0lqcQkDAwCifCBZ", // Replace with your temporary token
    uid: null,
};

rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

document.getElementById("join").onclick = async function () {
    options.uid = await rtc.client.join(
        options.appId,
        options.channel,
        options.token
    );
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await rtc.client.publish([rtc.localAudioTrack]);
    console.log("publish success!");
};

document.getElementById("leave").onclick = async function () {
    await rtc.client.unpublish([rtc.localAudioTrack]);
    rtc.localAudioTrack.close();
    await rtc.client.leave();
    console.log("leave success!");
};

rtc.client.on("user-published", async (user, mediaType) => {
    await rtc.client.subscribe(user, mediaType);
    console.log("subscribe success");

    if (mediaType === "audio") {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play();
    }
});

rtc.client.on("user-unpublished", async (user) => {
    await rtc.client.unsubscribe(user);
});
