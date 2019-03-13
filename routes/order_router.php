<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
require __DIR__.'/../modals/Order.php';

// Get All Users
$application->get('/api/orders', function ($request, $response) {
    $orderObject = new \App\Order();
    $orders = $orderObject->getAllOrders();
    return $this->response->withJson($orders);
});

//Create new user
$application->post('/api/orders', function (Request $request, Response $response) {
    $orderData = $request->getParsedBody();
    $orderObject = new \App\Order();
    $result = $orderObject->insertOneOrder($orderData);
    return $this->response->withJson($result);
});

// update user
$application->put('/api/orders/[{id}]', function (Request $request, Response $response, $arguments) {
    $orderId = $arguments['id'];
    $orderObject = new \App\Order();
    $orderData = $request->getParsedBody();
    return $this->response->withJson($orderObject->updateOneOrder($orderId, $orderData, false));
});

// delete user
$application->delete('/api/orders/[{id}]', function (Request $request, Response $response, $arguments) {
    $orderID = $arguments['id'];
    $orderObject = new \App\Order();
    return $this->response->withJson($orderObject->deleteOneOrder($orderID, 1));
});
