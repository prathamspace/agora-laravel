<!-- resources/views/layouts/app.blade.php -->

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <!-- Your head content -->
    <title>Your App</title>
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <!-- Include any additional styles or scripts here -->
</head>

<body>
    <div id="app">
        <!-- Render your AgoraChat.vue component -->
        <agora-chat></agora-chat>
    </div>

    <!-- Load your compiled JavaScript assets -->
    <script src="{{ mix('js/app.js') }}"></script>
</body>

</html>