<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agora Chat Call Kit</title>
</head>

<body>
    <div id="log"></div>
    <input type="text" id="userID" placeholder="User ID">
    <input type="text" id="token" placeholder="Agora Token">
    <button id="login">Login</button>
    <button id="logout">Logout</button>
    <input type="text" id="peerId" placeholder="Peer ID">
    <input type="text" id="peerMessage" placeholder="Message">
    <button id="send_peer_message">Send Message</button>

    @vite('resources/js/app.js')

    <script type="module">
        import {
            initAgoraCallkit,
            startCall,
            answerCall,
            handleCallStateChange
        } from '../agoraCallkit';

        // Sample connection object, replace with actual implementation
        const connection = {};
        const appId = 'b7ed4aa935ed4317942a13b338067854';
        const agoraUid = 'pratham';

        initAgoraCallkit(appId, agoraUid, connection);

        document.getElementById('login').onclick = function() {
            document.getElementById('log').appendChild(document.createElement('div')).append('Logging in...');
            const userId = document.getElementById('userID').value.toString();
            const token = document.getElementById('token').value.toString();
            connection.open({
                user: userId,
                agoraToken: token,
            });
        };

        document.getElementById('logout').onclick = function() {
            connection.close();
            document.getElementById('log').appendChild(document.createElement('div')).append('Logout success!');
        };

        document.getElementById('send_peer_message').onclick = function() {
            let peerId = document.getElementById('peerId').value.toString();
            let peerMessage = document.getElementById('peerMessage').value.toString();
            let options = {
                callType: 0, // Change call type as needed
                chatType: 'singleChat',
                to: peerId,
                message: peerMessage,
                channel: 'channel',
                accessToken: 'Agora token', // Replace with actual token
            };
            startCall(options);
        };
    </script>
</body>

</html>