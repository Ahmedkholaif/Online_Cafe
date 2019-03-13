<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

require('../modals/Products.php');

$application = new \Slim\App();


// Get All products
$application->get('/api/products', function (Request $request, Response $response, $arguement) {
    $productObject = new \App\Products();
    $products = $productObject->getAllProduct();
    return $this->response->withJson($products);
});


//Create new product
$application->post('/api/products', function (Request $request, Response $response, $arguement) {
    $productData = $request->getParsedBody();
    $productObject = new \App\Products();
    $result = $productObject->insertOneProduct($productData);
    return $this->response->withJson($result);
});


// update product
$application->put('/api/products/[{id}]', function (Request $request, Response $response, $argument) {
    $productId = $argument['id'];
    $productObject = new \App\Products();
    $productData = $request->getParsedBody();
    return $this->response->withJson($productObject->updateOneProduct($productId, $productData, false));
});


// delete product
$application->delete('/api/products/[{id}]', function (Request $request, Response $response, $argument) {
    $productID = $argument['id'];
    $productObject = new \App\Products();
    return $this->response->withJson($productObject->deleteOneProduct($productID, 1));
});
