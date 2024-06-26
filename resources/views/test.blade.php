<!-- resources/views/layouts/app.blade.php -->

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <!-- Your head content -->
</head>

<body>
    <div id="app">
        <agora-chat></agora-chat>
    </div>
    <script type="module" src="{{ mix('js/app.js') }}"></script>
</body>

</html>