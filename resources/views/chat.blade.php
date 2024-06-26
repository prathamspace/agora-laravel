<!-- resources/views/chat.blade.php -->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Agora Chat Examples</title>
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Import Vite compiled JavaScript -->
    @vite('resources/js/chat.js')

    <!-- Optional: Add stylesheets or other scripts -->
    <style>
        #leave {
            display: none;
        }
    </style>
</head>

<body>
    <h2>Agora Chat Examples</h2>
    <form id="loginForm">
        <div class="input-field">
            <label>User ID</label>
            <input type="text" placeholder="User ID" id="userID">
        </div>
        <div class="input-field">
            <label>Token</label>
            <input type="text" placeholder="Token" id="token">
        </div>
        <div>
            <button type="button" id="login">Login</button>
            <button type="button" id="logout">Logout</button>
        </div>
        <div class="input-field">
            <label>Peer user ID</label>
            <input type="text" placeholder="Peer user ID" id="peerId">
        </div>
        <div class="input-field">
            <label>Peer Message</label>
            <input type="text" placeholder="Peer message" id="peerMessage">
            <button type="button" id="send_peer_message">Send</button>
        </div>
        <div>
            <!-- UI elements for starting calls -->
            <button type="button" onclick="startVideoCall()">Start Video Call</button>
            <button type="button" id="leave">LEAVE</button>
            <button type="button" onclick="startAudioCall()">Start Audio Call</button>
        </div>
    </form>
    <hr />
    <div id="log"></div>

    <!-- Optional: Add more UI elements or scripts as needed -->
</body>

</html>