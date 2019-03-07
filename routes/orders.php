<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

// Get All orders

$app->get('/api/orders', function (Request $req, Response $res) {
    echo 'orders';
    // $res->getBody()->write('Hello there');
});

//Create new order
$app->post('/api/orders/{userName}', function (Request $req, Response $res) {
    echo 'orders';
    // $res->getBody()->write('Hello there');
});
// update order
$app->put('/api/orders/{orderId}', function (Request $req, Response $res) {
    echo 'orders';
    // $res->getBody()->write('Hello there');
});
// delete order
$app->delete('/api/orders/{orderId}', function (Request $req, Response $res) {
    echo 'orders';
    // $res->getBody()->write('Hello there');
});
