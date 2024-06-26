<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Agora Chat Examples</title>
    <!-- <script type="module" src="/main.js"></script> -->
    <!-- <link rel="stylesheet" href="style.css" type="text/css" /> -->

    @vite('resources/js/chat.js')
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
            <button type="button" id="send_peer_message">send</button>
        </div>
    </form>
    <hr />
    <div id="log"></div>


</body>

</html>