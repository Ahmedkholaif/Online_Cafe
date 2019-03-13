<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

// Get All orders
$app->get('/api/orders', function (Request $req, Response $res) {

});

//Create new order
$app->post('/api/orders/{userName}', function (Request $req, Response $res) {

});


// update order
$app->put('/api/orders/{orderId}', function (Request $req, Response $res) {

});


// delete order
$app->delete('/api/orders/{orderId}', function (Request $req, Response $res) {

});
