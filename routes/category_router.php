<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
require __DIR__.'/../modals/Category.php';

// get all categories
$application->get('/api/categories', function (Request $request, Response $response) {
    $categoryObject = new \App\Category();
    $categories = $categoryObject->getAllCategory();
    return $this->response->withJson($categories);
});

//Create new \App\Category
$application->post('/api/categories', function (Request $request, Response $response) {
    $categoryObject = new \App\Category();
    $categoryData = $request->getParsedBody();
    $result = $categoryObject->insertOneCategory($categoryData);
    return $this->response->withJson($result);
});

// update category
$application->put('/api/categories/[{id}]', function (Request $request, Response $response, $arguments) {
    $categoryObject = new \App\Category();
    $updatedId = $arguments['id'];
    $categoryData = $request->getParsedBody();
    $result = $categoryObject->updateOneCategory($updatedId, $categoryData, false);
    return $this->response->withJson($result);
});

// delete category
$application->delete('/api/categories/[{id}]', function (Request $request, Response $response, $arguments) {
    $categoryObject = new \App\Category();
    $result = $categoryObject->deleteOneCategory($arguments['id']);
    return $this->response->withJson($result);
});

