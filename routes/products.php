<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

// Get All products
$app->get('/api/products', function (Request $req, Response $res) {
    echo 'products';
    // $res->getBody()->write('Hello there');
});

//Create new product
$app->post('/api/products', function (Request $req, Response $res) {
    // $res->getBody()->write('Hello there');
});
// update product
$app->put('/api/products/{name}', function (Request $req, Response $res) {
    // $res->getBody()->write('Hello there');
});
// delete product
$app->delete('/api/products/{name}', function (Request $req, Response $res) {
});
