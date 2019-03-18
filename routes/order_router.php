<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

require __DIR__ . '/../modals/Order.php';

// Get All Orders
$application->get('/api/orders', function ($request, $response) {
    $orderObject = new \App\Order();
    $orders = $orderObject->getAllOrders();
    return $this->response->withJson($orders);
});

//Create new order
$application->post('/api/orders', function (Request $request, Response $response) {
    $orderData = $request->getParsedBody();
    $orderObject = new \App\Order();
    $result = $orderObject->insertOneOrder($orderData);
    return $this->response->withJson($result);
});

// update order
$application->put('/api/orders/[{id}]', function (Request $request, Response $response, $arguments) {
    $orderId = $arguments['id'];
    $orderObject = new \App\Order();
    $orderData = $request->getParsedBody();
    return $this->response->withJson($orderObject->updateOneOrder($orderId, $orderData, false));
});

// delete order
$application->delete('/api/orders/[{id}]', function (Request $request, Response $response, $arguments) {
    $orderID = $arguments['id'];
    $orderObject = new \App\Order();
    return $this->response->withJson($orderObject->deleteOneOrder($orderID, 1));
});

// change order status from processing to delivered
$application->put('/api/orders/delivered/[{id}]', function (Request $request, Response $response, $arguments) {
    $orderId = $arguments['id'];
    $orderObject = new \App\Order();
    $orderData = ['orderStatus' => 'delivered'];
    return $this->response->withJson($orderObject->updateOneOrder($orderId, $orderData, false));
});

// change order status from delivered to out
$application->put('/api/orders/out/[{id}]', function (Request $request, Response $response, $arguments) {
    $orderId = $arguments['id'];
    $orderObject = new \App\Order();
    $orderData = ['orderStatus' => 'out'];
    return $this->response->withJson($orderObject->updateOneOrder($orderId, $orderData, false));
});

// Get products username
$application->get('/api/orders/[{username}]', function (Request $request, Response $response, $arguement) {
    $orderObject = new \App\Order();
    $userName = $arguement['username'];
    $products = $orderObject->getOneOrder($userName, 1000);
    return $this->response->withJson($products);
});