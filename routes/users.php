<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

// Get All Users

$app->get('/api/users', function ($req, $res) {
    // echo 'users';

    $res->getBody()->write('Hello there');
});

//Create new user
$app->post('/api/users/{name}', function (Request $req, Response $res) {
});
// update user
$app->put('/api/users/{name}', function (Request $req, Response $res) {
});
// delete user
$app->delete('/api/users/{name}', function (Request $req, Response $res) {
});
