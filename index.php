<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

require('vendor/autoload.php');




try {
    $application = new \Slim\App([
        'settings' => [
            'displayErrorDetails' => true,
        ]
    ]);

    require_once 'routes/products_router.php';
    require_once 'routes/room_router.php';
    require_once 'routes/user_router.php';
    require_once 'routes/order_router.php';
    require_once 'routes/category_router.php';

    $application->run();
} catch (Exception $exception) {
    echo $exception->getMessage();
}

