<?php

use Illuminate\Support\Facades\Route;

$modulesPath = app_path('Modules');

foreach (glob($modulesPath . '/*', GLOB_ONLYDIR) as $modulePath) {

    $routesPath = $modulePath . '/Routes';

    if (is_dir($routesPath)) {

        foreach (glob($routesPath . '/*.php') as $routeFile) {

            Route::middleware(['web'])
                ->group($routeFile);
        }
    }
}