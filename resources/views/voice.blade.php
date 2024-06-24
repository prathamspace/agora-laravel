<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Agora Voice Quickstart</title>
    <!-- Import the bundled AgoraLogic.js file generated by webpack -->
    <!-- <script src="{{ asset('build/app.js') }}"></script> -->
    @vite('resources/js/agoraLogic.js')
</head>

<body>
    <h2>Web SDK Voice Quickstart</h2>
    <div>
        <button type="button" id="join">JOIN</button>
        <button type="button" id="leave">LEAVE</button>
    </div>
    <div id="log"></div>
</body>

</html>