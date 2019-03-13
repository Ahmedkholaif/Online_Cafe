<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

// Get All Users

$app->get('/api/users', function ($req, $res) {
    // echo 'users';

    $res->getBody()->write('Hello there');
});

//Create new user
$app->post('/api/users', function (Request $req, Response $res) {
    $body = json_decode($req->getBody());

    // $body = json_encode($body);
    $user = $body->user;

    // $categoryName = json_encode($categoryName);
    // header('{"msg":"Success"}');
    // echo '{'.$body.'}';
    // var_dump( $req );
    // echo $req
    echo json_encode($user);
});
// update user
$app->put('/api/users/{name}', function (Request $req, Response $res) {
});
// delete user
$app->delete('/api/users/{name}', function (Request $req, Response $res) {
    $email = $req->getAttribute('name'); //
    // var_dump( $req );
    echo json_encode($email);
});
