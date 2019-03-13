<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
require ('vendor/autoload.php');


$application = new \Slim\App();

//users routes
require_once './routes/users.php';
//products routes
require_once './routes/products.php';
//orders routes
require_once './routes/orders.php';
//categories routes
require_once './routes/categories.php';

// running the application
$application->run();
