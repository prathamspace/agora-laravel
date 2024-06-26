<?php
// app/Http/Middleware/VerifyCsrfToken.php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    protected $except = [
        // Add routes that should be excluded from CSRF verification here
        '/generate-token', // Example route to exclude from CSRF protection
    ];
}
