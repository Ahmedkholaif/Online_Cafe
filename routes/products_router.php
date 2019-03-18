<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

require __DIR__ . '/../modals/Product.php';


// Get All products
$application->get('/api/products', function (Request $request, Response $response, $arguement) {
    $productObject = new \App\Product();
    $products = $productObject->getAllProduct();
    return $this->response->withJson($products);
});

// Get products username
$application->get('/api/products/[{username}]', function (Request $request, Response $response, $arguement) {
    $productObject = new \App\Product();
    $userName = $arguement['username'];
    $products = $productObject->getOneProduct($userName, 1000);
    return $this->response->withJson($products);
});


//Create new \App\Product
$application->post('/api/products', function (Request $request, Response $response, $arguement) {
    $productData = $request->getParsedBody();
    $productObject = new \App\Product();
    $result = $productObject->insertOneProduct($productData);
    return $this->response->withJson($result);
});
// update product
$application->put('/api/products/[{id}]', function (Request $request, Response $response, $argument) {
    $productId = $argument['id'];
    $productObject = new \App\Product();
    $productData = $request->getParsedBody();
    return $this->response->withJson($productObject->updateOneProduct($productId, $productData, false));
});
// delete product
$application->delete('/api/products/[{id}]', function (Request $request, Response $response, $argument) {
    $productID = $argument['id'];
    $productObject = new \App\Product();
    return $this->response->withJson($productObject->deleteOneProduct($productID));
});


// product available
$application->put('/api/products/available/[{id}]', function (Request $request, Response $response, $argument) {
    $productId = $argument['id'];
    $productObject = new \App\Product();
    $productAvailable = $request->getParsedBody();
    return $this->response->withJson($productObject->updateOneProduct($productId, $productAvailable, false));
});
