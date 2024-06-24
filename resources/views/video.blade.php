<!-- resources/views/video-call.blade.php -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Agora Video Call</title>
    @vite('resources/js/agoraVideoLogic.js')
</head>

<body>
    <h2>Agora Video Call</h2>
    <div>
        <button type="button" id="join">JOIN</button>
        <button type="button" id="leave">LEAVE</button>
    </div>
    <div id="log"></div>
</body>

</html>