<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface;
use \Psr\Http\Message\ResponseInterface;


require('vendor/autoload.php');


try {
    $configuration = [
        'settings' => [
            'displayErrorDetails' => true,
        ]
    ];

    $container = new \Slim\Container($configuration);
    // 404 Error not found
    $container['notFoundHandler'] = function ($container) {
        return function ($request, $response) use ($container) {
            $response = new \Slim\Http\Response(404);
            return $response->write("404 Error - Page not found");
        };
    };

    // 405 not allowed
    $container['notAllowedHandler'] = function ($container) {
        return function ($request, $response, $methods) use ($container) {
            $response = new \Slim\Http\Response(405);
            return $response
                ->withHeader('Allow', implode(', ', $methods))
                ->withHeader('Content-type', 'text/html')
                ->write('Method must be one of: ' . implode(', ', $methods));
        };
    };

    // Runtime error
    $container['phpErrorHandler'] = function ($container) {
        return function ($request, $response, $error) use ($container) {
            $response = new \Slim\Http\Response(500);
            return $response
                ->withHeader('Content-Type', 'text/html')
                ->write('Something went wrong!');
        };
    };

    $application = new \Slim\App($container);
    require_once 'routes/products_router.php';
    require_once 'routes/room_router.php';
    require_once 'routes/user_router.php';
    require_once 'routes/order_router.php';
    require_once 'routes/category_router.php';

    $application->run();
} catch (Exception $exception) {
    echo $exception->getMessage();
}



// -----------------------------------------------
// TODO: /api/products/available/_id
// TODO: /api/products/userFullName
// TODO: User Password Hash
// -----------------------------------------------
// TODO: Schema Validation
// TODO: Validation Utilities - Email.....
// TODO: Slim/Authentication
// TODO: Slim/Session Management
// TODO: Session Managment
// TODO: Logout
// -----------------------------------------------

