<?php


use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

require('../modals/Room.php');

$application = new \Slim\App();

// get all rooms
$application->get('/api/rooms', function (Request $request, Response $response) {
    $roomObject = new \App\Room();
    $rooms = $roomObject->getAllRoom();
    return $this->response->withJson($rooms);
});

//Create new room
$application->post('/api/rooms', function (Request $request, Response $response) {
    $roomObject = new \App\Room();
    $roomData = $request->getParsedBody();
    $result = $roomObject->insertOneRoom($roomData);
    return $this->response->withJson($result);
});

// update room
$application->put('/api/rooms/[{id}]', function (Request $request, Response $response, $arguments) {
    $roomObject = new \App\Room();
    $updatedId = $arguments['id'];
    $roomData = $request->getParsedBody();
    $result = $roomObject->updateOneRoom($updatedId, $roomData, false);
    return $this->response->withJson($result);
});

// delete category
$application->delete('/api/rooms/[{id}]', function (Request $request, Response $response, $arguments) {
    $roomObject = new \App\Room();
    $result = $roomObject->deleteOneRoom($arguments['id']);
    return $this->response->withJson();
});
