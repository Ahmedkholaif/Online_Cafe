<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

require __DIR__ . '/../modals/User.php';


// Get All Users
$application->get('/api/users', function ($request, $response) {
    $userObject = new \App\User();
    $users = $userObject->getAllUser();
    return $this->response->withJson($users);
});

//Create new \App\User
$application->post('/api/users', function (Request $request, Response $response) {
    $userData = $request->getParsedBody();
    $userObject = new \App\User();
    $result = $userObject->insertOneUser($userData);
    return $this->response->withJson($result);
});

// update user
$application->put('/api/users/[{id}]', function (Request $request, Response $response, $arguments) {
    $userId = $arguments['id'];
    $userObject = new \App\User();
    $userData = $request->getParsedBody();
    return $this->response->withJson($userObject->updateOneUser($userId, $userData, false));
});

// delete user
$application->delete('/api/users/[{id}]', function (Request $request, Response $response, $arguments) {
    $userID = $arguments['id'];
    $userObject = new \App\User();
    return $this->response->withJson($userObject->deleteOneUser($userID, 1));
});

// user's login
$application->post('/api/users/login', function (Request $request, Response $response) {
    $userData = $request->getParsedBody();
    $email = $userData['email'];
    $password = password_hash($userData['password'], PASSWORD_DEFAULT);
    $userObject = new \App\User();
    $result = $userObject->getOneUserLogin($email, $password);
    return $this->response->withJson($result);
});

// user's logout
$application->get('/api/users/logout', function (Request $request, Response $response) {

});
// user's forget

// email Class