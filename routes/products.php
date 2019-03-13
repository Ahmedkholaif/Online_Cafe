<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

// Get All products
$app->get('/api/products', function (Request $req, Response $res) {

});


//Create new product
$app->post('/api/products', function (Request $req, Response $res) {

});


// update product
$app->put('/api/products/{name}', function (Request $req, Response $res) {

});


// delete product
$app->delete('/api/products/{name}', function (Request $req, Response $res) {

});
