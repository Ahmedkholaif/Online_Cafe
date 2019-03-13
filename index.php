<?php

require_once './vendor/autoload.php';

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App();

$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');

    $response->getBody()->write("hello, $name");

    return $response;
});
$app->get('/', function (Request $req, Response $res) {
    echo 'Login API';
    
});
//users routes
require_once './routes/users.php';
//products routes
require_once './routes/products.php';
//orders routes
require_once './routes/orders.php';
//categories routes
require_once './routes/categories.php';


$app->run();
