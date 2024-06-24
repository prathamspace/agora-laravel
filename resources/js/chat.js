import AC from "agora-chat";

// Replace <Your app key> with your app key
const appKey = "411165619#1353321";
const conn = new AC.connection({
    appKey: appKey,
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
